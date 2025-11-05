import React, { useState, useEffect } from "react";

const RegistrationSuccess = ({ registration }) => {
    const [copied, setCopied] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true); // fade-in effect on mount
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(registration.unique_key_hscmap26)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // reset after 2s
            })
            .catch(() => {
                alert("Failed to copy. Please copy manually.");
            });
    };

    return (
        <div className={`min-h-screen flex items-center justify-center bg-gray-50 p-4 transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center">

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 rounded-full p-4">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h1>

                {/* User Name */}
                <p className="text-gray-600 text-lg mb-6">
                    Thank you, <span className="font-semibold">{registration.name}</span>, for registering.
                </p>

                {/* Unique Key Card */}
                <div
                    className="bg-gray-50 border-2 border-blue-300 p-8 rounded-2xl w-full cursor-pointer hover:bg-blue-50 transition duration-200 shadow-md"
                    onClick={copyToClipboard}
                >
                    <p className="text-gray-700 font-medium mb-2 text-lg tracking-wide">Your Exam Roll</p>
                    <p className="text-5xl font-extrabold text-blue-700 font-mono tracking-widest select-all">
                        {registration.unique_key_hscmap26}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">{copied ? "Copied!" : "Click to copy"}</p>
                </div>

                {/* Note */}
                <p className="text-gray-500 text-sm mt-8">
                    Please save this unique key. You may need it for verification or future reference.
                </p>
            </div>
        </div>
    );
};

export default RegistrationSuccess;
