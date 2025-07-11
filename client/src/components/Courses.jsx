import React, { useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [activeTab, setActiveTab] = useState("neet");

  const courses = {
    neet: [
      {
        title: "NEET – Two Year Premier Course",
        features: [
          "Starts From July 2025",
          "For 11th-Grade Students",
          "15+ Hours Of Weekly (Offline Classes)",
          "Online Supportive Classes",
          "Topic-Wise Full Syllabus Notes",
          "Regular Assessment & Test Prep",
        ],
      },
      {
        title: "NEET – One Year Premier Course",
        features: [
          "Starts From June 2025",
          "For 12th-Grade Students",
          "15+ Hours Of Weekly (Offline Classes)",
          "Online Supportive Classes",
          "Topic-Wise Full Syllabus Notes",
          "Regular Assessment & Test Prep",
        ],
      },
      {
        title: "NEET Crash Course",
        features: [
          "Starts From March 2025",
          "One Month Of Intensive Coaching",
          "54+ Hours Of Weekly (Online/Offline Classes)",
          "Live Doubt Clearing Session",
          "Online Supportive Classes",
          "Regular Assessment & Test Prep",
        ],
      },
      {
        title: "NEET Repeater Course",
        features: [
          "Starts From June 2025",
          "For Post-12th Graders To Excel In The Coming Year’s NEET",
          "38+ Hours Of Weekly (Online/Offline Classes)",
          "Live Doubt Clearing Session",
          "Online Supportive Classes",
          "Topic-Wise Full Syllabus Notes",
          "Regular Assessment & Test Prep",
        ],
      },
    ],
    jee: [
      { title: "JEE – Main Course", features: ["Details coming soon..."] },
      { title: "JEE – Advanced Course", features: ["Details coming soon..."] },
    ],
    foundation: [
      {
        title: "Foundation for Class 8",
        features: ["Basics of Science & Math", "Early NEET/JEE concepts"],
      },
      {
        title: "Foundation for Class 9 & 10",
        features: ["Physics, Chemistry, Math, Biology", "Olympiad Coaching"],
      },
    ],
  };

  return (
    <section id="courses" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">
          Achieve Your <span className="text-indigo-600 underline">NEET</span>{" "}
          Dream With Tailored Courses
        </h2>
        <p className="text-center mb-8 text-gray-600">
          Our courses are crafted by NEET experts to ensure thorough
          understanding and mastery of every topic. Join us and take a confident
          step towards your medical career.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-6 flex-wrap gap-2">
          {["neet", "jee", "foundation"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border transition ${
                activeTab === tab
                  ? "bg-yellow-400 text-black font-semibold"
                  : "bg-white text-gray-700"
              }`}
            >
              {tab === "neet"
                ? "Our NEET Courses"
                : tab === "jee"
                  ? "Our JEE Courses"
                  : "Our Foundation Courses"}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses[activeTab].map((course, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg shadow p-6 flex flex-col justify-between"
            >
              <h3 className="text-lg font-bold mb-4 text-gray-800">
                {course.title}
              </h3>
              <ul className="list-disc list-inside mb-6 space-y-1 text-sm text-gray-700">
                {course.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-auto inline-block text-center bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                ENQUIRE NOW
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
