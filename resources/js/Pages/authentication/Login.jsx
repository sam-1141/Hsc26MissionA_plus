import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import { useRoute } from "ziggy-js";
import "./login.css";

const Login = ({ flash, errors, core_app_registration_url }) => {
    const route = useRoute();
    const [values, setValues] = useState({
        login: "",
        exam_roll: "",
    });

    const [error, setError] = useState(""); // for login validation (phone/email)

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const { login } = values;

        let formattedLogin = login.trim();

        // Email validation
        if (formattedLogin.includes("@")) {
            if (
                !formattedLogin.includes(".") ||
                formattedLogin.split("@")[0].length < 1
            ) {
                setError("ইমেইল ঠিকানা সঠিক নয়");
                return;
            }
        } else {
            // Phone validation
            const digits = formattedLogin.replace(/\D/g, "");
            if (!/^01[3-9]\d{8}$/.test(digits)) {
                setError("সঠিক ফোন নাম্বার দিন (01XXXXXXXXX)");
                return;
            }
            formattedLogin = digits.startsWith("88") ? digits : "88" + digits;
        }

        const submitValues = {
            ...values,
            login: formattedLogin,
        };
        console.log(submitValues);

        router.post(route("execute.auth.login"), submitValues);
    };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-left">
                    <h2>ফাহাদ'স টিউটোরিয়াল-এ তোমাকে স্বাগতম</h2>
                    <img src="/assets/images/auth.7b116a16.png" alt="Welcome" />
                </div>

                <div className="login-form">
                    <div className="border border-primary p-4 rounded shadow">
                        <form onSubmit={handleSubmit}>
                            <h3>এইচএসসি মিশনে এ প্লাস- পরীক্ষা দেওয়ার জন্য</h3>
                            <h2>লগ ইন করো</h2>

                            <label>
                                ফোন নাম্বার বা ইমেইল
                                <span className="text-danger"> *</span>
                            </label>
                            <input
                                type="text"
                                name="login"
                                placeholder="01234567890 বা your@email.com"
                                value={values.login}
                                onChange={handleChange}
                            />
                            {error && (
                                <small className="text-danger d-block mb-2">{error}</small>
                            )}

                            <label>
                                পরীক্ষার রোল
                                <span className="text-danger"> *</span>
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="text"
                                    name="exam_roll"
                                    placeholder="তোমার পরীক্ষার রোল"
                                    value={values.exam_roll}
                                    onChange={handleChange}
                                    style={{ paddingRight: "2.5rem" }}
                                />
                            </div>

                            {/* Show backend validation errors and flash error under exam_roll */}
                            <div className="text-danger">
                                {/* Backend validation errors (Laravel) */}
                                {errors &&
                                    Object.values(errors).map((errMsg, idx) => (
                                        <div key={idx}>{errMsg}</div>
                                    ))}

                                {/* Flash error (like wrong roll or login) */}
                                {flash?.error && <div>{flash.error}</div>}
                            </div>

                            <div className="forgot-password text-start mt-3">
                                <Link href={route("auth.forgot.password")}>
                                    পরীক্ষার রোল ভুলে গিয়েছো?
                                </Link>
                            </div>

                            <button type="submit" className="login-btn fw-bold mt-3">
                                লগ ইন
                            </button>

                            <p className="error-message fst-italic mt-3">
                                পূনঃস্মরণ: তুমি যদি কখনো Registration না করে
                                থাকো, তাহলে তোমার Registration করতে{" "}
                                <span className="forgot-password">
                                    <Link href={route("auth.registration.form")}>
                                        Hsc Mission A+ Registration?
                                    </Link>
                                </span>{" "}
                                -তে ক্লিক করো
                            </p>

                            <hr />

                            <div className="signup-link">
                                <span>ফাহাদ'স টিউটোরিয়াল-এ নতুন?</span>
                                <Link href={route("auth.registration.form")} className="fw-bold">
                                    সাইন আপ করো
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
