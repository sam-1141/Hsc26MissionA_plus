import React, { useEffect, useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import { useRoute } from "ziggy-js";
import "./login.css";
import CollegeAutocomplete from "./CollegeAutocomplete";

function Registration({ flash, errors }) {
    const route = useRoute();
    const parseCollege = (collegeString) => {
        // Expecting format: "College Name (EIIN: 123456)"
        const match = collegeString.match(/^(.*) \(EIIN: (\d+)\)$/);
        if (match) {
            return {
                name: match[1].trim(),
                eiin: match[2].trim(),
            };
        } else {
            // No match, return full string as name and default EIIN
            return {
                name: collegeString.trim(),
                eiin: "000000",
            };
        }
    };

    const { data, setData, post, processing, reset } = useForm({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        facebook: "",
        college: "",
        courseName: "",
        hsc26Mission: false,
        feedback: "",
    });

    const [mobileError, setMobileError] = useState("");
    const [facebookError, setFacebookError] = useState("");
    const [collegesData, setCollegesData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);



    useEffect(() => {
        fetch("/data/all_colleges.json")
            .then((res) => res.json())
            .then((data) => setCollegesData(data))
            .catch((err) => console.error("Failed to load college data:", err));
    }, []);
    useEffect(() => {
        fetch("/data/batches.json")
            .then((res) => res.json())
            .then((data) => setCoursesData(data))
            .catch((err) => console.error("Failed to load courses data:", err));
    }, []);


    const validateMobile = (value) => {
        const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
        const isValid = /^01\d{9}$/.test(digitsOnly);
        setMobileError(
            isValid
                ? ""
                : "মোবাইল নাম্বার অবশ্যই '01' দিয়ে শুরু হতে হবে এবং ১১ ডিজিট হতে হবে"
        );
        return digitsOnly;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "mobile") {
            const formatted = validateMobile(value);
            setData(name, formatted);
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobileError || facebookError) return;
        const { name: collegeNameParsed, eiin: collegeEiin } = parseCollege(data.college);
        if (!data.college || !collegeNameParsed) {
            toast.error("কলেজের নাম অবশ্যই নির্বাচন করতে হবে");
            return;
        }



        const formattedMobile = data.mobile.startsWith("01")
            ? `88${data.mobile}`
            : data.mobile;

        // const { name: collegeNameParsed, eiin: collegeEiin } = parseCollege(data.college);
        // router.post(
        //     route("execute.auth.hsc26mapregistration"),
        //     {
        //         name: `${data.firstName} ${data.lastName}`.trim(),
        //         mobile: formattedMobile,
        //         fb_id: data.facebook,
        //         Hsc_Batch: (data.courseName.join(",")),
        //         college: collegeNameParsed,
        //         eiin: collegeEiin,
        //         email: data.email,
        //         address: data.feedback,
        //         hsc26Mission: data.hsc26Mission
        //     },
        //     {
        //         onSuccess: () =>
        //             reset(),

        //     });
        const payload = {
            name: `${data.firstName} ${data.lastName}`.trim(),
            mobile: formattedMobile,
            fb_id: data.facebook,
            Hsc_Batch: (data.courseName),
            college: collegeNameParsed,
            eiin: collegeEiin,
            email: data.email,
            address: data.feedback,
            hsc26Mission: data.hsc26Mission
        };
        console.log(payload)

    };
    const handleSelectCollege = (college) => {
        const collegeName = college["কলেজের নাম"];
        const eiin = college["EIIN"] || "000000";

        // Show only the name in the input
        setData("collegeDisplay", collegeName);

        // Store full data for backend
        setData("college", `${collegeName} (EIIN: ${eiin})`);
    };
    const handleDropdownChange = (id) => {
        setData((prev) => ({
            ...prev,
            courseName: [id],
        }));
    };



    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (errors)
            Object.values(errors).forEach((error) => toast.error(error));
    }, [flash, errors]);

    return (
        <div className="login-container">
            <ToastContainer />
            <div className="login-wrapper">
                <div className="login-left">
                    <h2>ফাহাদ'স টিউটোরিয়াল-এ তোমাকে স্বাগতম</h2>
                    <h1>HSC 2026 Mission A+</h1>
                    <img src="/assets/images/auth.7b116a16.png" alt="Welcome" />

                    
                </div>


                <div className="login-form">
                    <div className="border border-primary p-4 rounded shadow">
                        <form onSubmit={handleSubmit}>
                            <h3>Registration Form</h3>

                            {/* নাম */}
                            <div className="name-fields">
                                <div>
                                    <label>
                                        নামের প্রথম অংশ{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="নামের প্রথম অংশ"
                                        value={data.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>
                                        নামের শেষ অংশ{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="নামের শেষ অংশ"
                                        value={data.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* ইমেইল */}
                            <label>
                                ইমেইল আইডি{" "}
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="example@gmail.com"
                                value={data.email}
                                onChange={handleChange}
                                required
                            />

                            {/* মোবাইল নাম্বার */}
                            <label>
                                মোবাইল নাম্বার{" "}
                                <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text h-100 border-end-0 d-flex align-items-center bg-white">
                                    +88
                                </span>
                                <input
                                    type="tel"
                                    name="mobile"
                                    className="form-control h-100 border-start-0"
                                    placeholder="01XXXXXXXXX"
                                    value={data.mobile}
                                    onChange={handleChange}
                                    maxLength={11}
                                    required
                                />
                            </div>
                            {mobileError && (
                                <small className="text-danger">
                                    {mobileError}
                                </small>
                            )}

                            {/* <div className="mb-3 text-md text-muted">
                                *তোমার ফোন নম্বরে একটি OTP পাঠানো হবে
                            </div> */}

                            {/* কলেজ */}
                            <CollegeAutocomplete
                                label="কলেজের নাম"
                                name="college"
                                value={data.collegeDisplay || ""}  // Only show college name
                                onChange={(e) => {
                                    const inputName = e.target.value;
                                    setData("collegeDisplay", inputName);

                                    // Match with your JSON
                                    const matchedCollege = collegesData.find(
                                        (c) => c["কলেজের নাম"] === inputName
                                    );

                                    // Store the full value for backend submission
                                    if (matchedCollege) {
                                        setData("college", `${inputName} (EIIN: ${matchedCollege["EIIN"]})`);
                                    } else {
                                        setData("college", `${inputName} (EIIN: 000000)`);
                                    }
                                }}
                                onSelect={handleSelectCollege}
                                colleges={collegesData}
                                required
                            />




                            {/* কোর্স */}

                            <p>এইচএসসি ব্যাচ:</p>
                            <select
                                value={data.courseName[0] || ""}
                                onChange={(e) => handleDropdownChange(e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 w-full mb-6 focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="" disabled>তোমার HSC ব্যাচ নির্বাচন কর</option>
                                {coursesData.map((course) => (
                                    <option key={course.name} value={course.name}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>

                            {/* Mission 26 */}
                            <p>তুমি কি আমাদের HSC 26 Mission A+ কোর্সে যুক্ত হয়েছো?? </p>
                            <select
                                name="hsc26Mission"
                                value={data.hsc26Mission}
                                onChange={(e) => setData("hsc26Mission", e.target.value)}
                                style={{ width: "100%", padding: "8px", marginBottom: "25px" }}
                            >
                                <option value="NO">না</option>
                                <option value="YES">হ্যাঁ</option>
                                <option value="WILL_BE">কিছুদিন পর ভর্তি হবো</option>
                            </select>


                            {/* ফেসবুক */}
                            <label>
                                ফেসবুক প্রোফাইল লিঙ্ক{" "}
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="url"
                                name="facebook"
                                placeholder="https://www.facebook.com/your.profile"
                                value={data.facebook}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />

                            {/* মতামত */}
                            <label>
                                বর্তমান ঠিকানা:
                            </label>
                            <textarea
                                name="feedback"
                                placeholder="উপহার পাঠানোর জন্য ঠিকানার ঘরটি সঠিকভাবে পূরণ করা জরুরি।..."
                                value={data.feedback}
                                onChange={handleChange}
                                style={{ minHeight: 120, width: "95%" }}
                            ></textarea>

                            <button
                                type="submit"
                                className="login-btn text-bold mt-3"
                                disabled={
                                    processing || mobileError || facebookError
                                }
                            >
                                {processing ? "প্রসেসিং..." : "Submit"}
                            </button>

                            <hr />
                            {/* <div>
                                সাইন আপ করার মাধ্যমে তুমি ফাহাদ'স টিউটোরিয়াল-এর{" "}
                                <Link>শর্তাদি</Link> এবং{" "}
                                <Link>প্রাইভেসি পলিসিতে</Link> সম্মতি দিচ্ছো
                            </div> */}

                            {/* <div className="signup-link">
                                <span>
                                    ফাহাদ'স টিউটোরিয়াল-এ অ্যাকাউন্ট আছে?
                                </span>
                                <Link
                                    href={route("auth.login")}
                                    className="fw-bold"
                                >
                                    লগইন করো
                                </Link>
                            </div> */}
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;






