import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import { useRoute } from "ziggy-js";
import "./login.css";

const Login = ({ flash, errors, core_app_registration_url }) => {
    const route = useRoute();
    const [values, setValues] = useState({
        login: "",
        password: "",
    });

    const [error, setError] = useState(""); // for login validation (phone/email)
    const [showPassword, setShowPassword] = useState(false);

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
            if (!/^(?:\+?880|0)1[1-9]\d{8}$/.test(digits)) {

                setError("সঠিক ফোন নাম্বার দিন (01XXXXXXXXX)");
                return;
            }
            formattedLogin = digits.startsWith("88") ? digits : "88" + digits;
        }

        const submitValues = {
            ...values,
            login: formattedLogin,
        };

        router.post(route("auth.login.post"), submitValues);
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
<div style={{ textAlign: "center", marginBottom: "28px" }}>
  <h2
    style={{
      fontFamily: "'Poppins', 'Segoe UI', Roboto, sans-serif",
      fontSize: "28px",
      fontWeight: 700,
      color: "#1f2937",
      letterSpacing: "0.3px",
      marginBottom: "8px",
    }}
  >
    <span style={{ color: "#1f2937" }}>HSC 26</span>{" "}
    <span style={{ color: "#2563eb" }}>MISSION A+</span>{" "}
    <span style={{ color: "#374151" }}>EXAM এ অংশগ্রহণের জন্য</span>{" "}
    <span style={{ color: "#2563eb" }}>লগ ইন করো</span>
  </h2>

  <p
    style={{
      fontFamily: "'Poppins', 'Segoe UI', Roboto, sans-serif",
      fontSize: "18px",
      fontWeight: 600,
      color: "#db2777",       // noticeable pink-red
      marginTop: "6px",
    }}
  >
    ⭐ পরীক্ষাটি আজ সন্ধ্যা ৬টা থেকে ৯টার মধ্যে যে কোনো সময় দেওয়া যাবে।
  </p>
</div>



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
                                রেজিস্ট্রেশন নং
                                <span className="text-danger"> *</span>
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="FT_XXXXXX"
                                    value={values.password}
                                    onChange={handleChange}
                                    style={{ paddingRight: "2.5rem" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: "0.5rem",
                                        top: "40%",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 0,
                                        margin: 0,
                                        color: "#555",
                                    }}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <i className="fas fa-eye-slash" style={{ fontSize: "18px" }}></i>
                                    ) : (
                                        <i className="fas fa-eye" style={{ fontSize: "18px" }}></i>
                                    )}
                                </button>
                            </div>

                            {/* Show backend validation errors and flash error under password */}
                            <div className="text-danger">
                                {/* Backend validation errors (Laravel) */}
                                {errors &&
                                    Object.values(errors).map((errMsg, idx) => (
                                        <div key={idx}>{errMsg}</div>
                                    ))}

                                {/* Flash error (like wrong password) */}
                                {flash?.error && <div>{flash.error}</div>}
                            </div>

                            {/* <div className="forgot-password text-start mt-3">
                                <a
                                    href="https://webapp.ft.education/auth/forgot-password"

                                    rel="noopener noreferrer"
                                >
                                    পাসওয়ার্ড ভুলে গিয়েছো?
                                </a>
                            </div> */}

                            <button type="submit" className="login-btn fw-bold mt-3">
                                লগ ইন
                            </button>

                            {/* <p className="error-message fst-italic mt-3">
                                পূনঃস্মরণ: তুমি যদি কখনো পাসওয়ার্ড সেট না করে
                                থাকো, তাহলে তোমার পাসওয়ার্ড সেট করতে{" "}
                                <span className="forgot-password">
                                    <Link href={route("auth.forgot.password")}>
                                        পাসওয়ার্ড ভুলে গিয়েছো?
                                    </Link>
                                </span>{" "}
                                -তে ক্লিক করো
                            </p> */}

                            <hr />

                            {/* <p className="error-message fst-italic mt-3">
                                পুনঃস্মরণ: তুমি যদি কখনো পাসওয়ার্ড সেট না করে থাকো, তাহলে তোমার পাসওয়ার্ড সেট করতে{" "}
                                <span className="forgot-password">
                                    <a
                                        href="https://webapp.ft.education/auth/registration"

                                        rel="noopener noreferrer"
                                    >
                                        এখানে রেজিস্ট্রেশন করো
                                    </a>
                                </span>
                            </p> */}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
