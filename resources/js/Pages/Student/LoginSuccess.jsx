import React, { useState } from "react";
import Header from "./Header"; // 👈 adjust path based on your project structure

const Dashboard = ({ user, promptEvent, isAppInstalled, installApp }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { label: "Dashboard", icon: "🏠" },
    { label: "Show Certificate", icon: "📜" },
    { label: "Show Answer", icon: "🧾" },
    { label: "Show Question", icon: "❓" },
    { label: "Script", icon: "📘" },
  ];

  const renderContent = () => {
    const { name, unique_key_hscmap26, achieved_mark } = user || {};

    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="bg-white shadow-lg rounded-2xl p-12 w-full max-w-md text-center border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Student Dashboard
            </h2>
            <div className="space-y-6 text-left">
              <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-sm uppercase text-gray-500 mb-1">Name</p>
                <p className="text-2xl font-semibold text-gray-800">{name}</p>
              </div>
              <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-sm uppercase text-gray-500 mb-1">Unique Key</p>
                <p className="text-2xl font-semibold text-indigo-600 tracking-wide">
                  {unique_key_hscmap26}
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-sm uppercase text-gray-500 mb-1">Achieved Mark</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {achieved_mark ?? "Not Available"}
                </p>
              </div>
            </div>
          </div>
        );

      case "Show Certificate":
        return (
          <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎓 Your Certificate
            </h2>
            <p className="text-gray-600 mb-4">
              Certificate for <span className="font-semibold">{name}</span> <br />
              (Key: <span className="text-indigo-600">{unique_key_hscmap26}</span>)
            </p>
            <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm shadow">
              Download PDF
            </button>
          </div>
        );

      case "Show Answer":
        return (
          <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🧾 Answers</h2>
            <p className="text-gray-600">Your submitted answers will appear here.</p>
          </div>
        );

      case "Show Question":
        return (
          <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">❓ Questions</h2>
            <p className="text-gray-600">Questions from your last exam appear here.</p>
          </div>
        );

      case "Script":
        return (
          <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📘 Script</h2>
            <p className="text-gray-600">
              Your written exam scripts or files will be shown here.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* ✅ Header at the top */}
      <Header
        promptEvent={promptEvent}
        isAppInstalled={isAppInstalled}
        installApp={installApp}
      />

      {/* ✅ Body below the header */}
      <div className="flex flex-col items-center justify-start flex-grow pt-16">
        {/* Top horizontal menu */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === item.label
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex items-center justify-center w-full px-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
