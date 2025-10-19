import React, { useState, useEffect } from "react";

const LoginSuccess = ({ user }) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true); // fade-in effect on mount
    }, []);

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
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Successful!</h1>

                {/* User Name */}
                <p className="text-gray-600 text-lg mb-6">
                    Welcome back, <span className="font-semibold">{user.name}</span>.
                </p>

                {/* Achieved mark card */}
                <div className="bg-gray-50 border-2 border-blue-300 p-8 rounded-2xl w-full shadow-md">
                    <p className="text-gray-700 font-medium mb-2 text-lg tracking-wide">Your Exam Status</p>
                    <p className="text-4xl font-extrabold text-blue-700 font-mono tracking-widest select-all">
                        {user.achieved_mark ?? 0} Marks
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        {user.achieved_mark === null ? "Exam Absent" : "Exam completed"}
                    </p>
                </div>

                {/* Note */}
                <p className="text-gray-500 text-sm mt-8">
                    Please save your details for future reference.
                </p>
            </div>
        </div>
    );
};

export default LoginSuccess;
