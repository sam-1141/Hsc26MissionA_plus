import React from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Layout({ children }) {
    return (
        <>
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
                <Link href="/" className="navbar-brand fw-bold">
                    Exam System
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link href={route("admin.exam.details")} className="nav-link">
                                add questions
                            </Link>
                        </li>


                        <li className="nav-item">
                            <Link href={route("show.video.settings")} className="nav-link">
                                video settings
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href={route("admin.dashboard")} className="nav-link">
                                Admin Dashboard
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href={route("admin.live-exams.create")} className="nav-link">
                                Create Live Exam
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href={route("admin.invigilator")} className="nav-link">
                                Invigilators
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                as="button"
                                method="post"
                                href={route("auth.logout")}
                                className="btn btn-danger ms-lg-2"
                            >
                                Logout
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>

            {/* PAGE CONTENT */}
            <main className="container py-4">
                {children}
            </main>
        </>
    );
}
