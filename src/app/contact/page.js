"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Send, User, Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      console.log("Contact form submitted:", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const styles = `
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.6s ease-out forwards;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col items-center justify-between gap-8">
          {/* Contact Form Section */}
          <div className="bg-white w-full rounded-2xl max-w-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold mb-3">Get in Touch</h1>
              <p className="text-blue-100 leading-relaxed">
                Have questions, feedback, or just want to say hello? We would love to hear from you!
              </p>
            </div>

            <div className="p-8">
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                  <p className="text-green-700 font-medium">Your message has been sent successfully!</p>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                  <p className="text-red-700 font-medium">Failed to send message. Please try again later.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
                      <User className="w-4 h-4 inline mr-2" />
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Your Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-3">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Regarding SlideLink features..."
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-lg"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-3">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-lg resize-y"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-lg flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Portfolio Section Below Form */}
          <div className="bg-gradient-to-b from-gray-900 to-blue-900  text-white p-8 rounded-2xl shadow-lg mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-4 items-start text-left animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800/80 border border-gray-700 rounded-full text-sm text-gray-200 backdrop-blur-sm hover:bg-gray-700 transition-all duration-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Welcome to my universe
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                  Hello
                  I’m{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Khandaker Samin Yeasar
                  </span>
                </h1>
                <div className="flex flex-wrap gap-2 my-4">
                  <span className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-full text-gray-200 text-sm backdrop-blur-sm hover:bg-gray-700 transition-all duration-300 cursor-default">
                    Learning MARN Stack
                  </span>
                  <span className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-full text-gray-200 text-sm backdrop-blur-sm hover:bg-gray-700 transition-all duration-300 cursor-default">
                    Clean Code
                  </span>
                  <span className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-full text-gray-200 text-sm backdrop-blur-sm hover:bg-gray-700 transition-all duration-300 cursor-default">
                    Innovation
                  </span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  JavaScript lover 🖋️ | Olovals creator ⚡ | Crafting frameworks and coding the future ✨
                </p>
                <div className="flex gap-4 mt-6">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                    Learn More
                  </button>
                  <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300">
                    Get Resume
                  </button>
                </div>
              </div>
              <div className="animate-fade-in-up">
                <CoderProfileCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const coderData = {
  name: "Khandaker Samin Yeasar",
  department: "Software Engineering",
  batch: "42",
  role: "Frontend Developer",
  seniority: "Mid-Level",
  location: "Bangladesh",
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "TailwindCSS",
    "CSS",
    "Figma",
    "GitHub",
    "HTML",
    "Astro",
    "Node.js",
    "Express",
    "MongoDB",
    "Firebase",
    "Git",
  ],
};

const CoderProfileCard = () => {
  return (
    <div className="w-full mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-900 px-4 py-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-xs text-gray-400 font-mono">coder.js</span>
      </div>
      <div className="p-4 overflow-hidden relative">
        <code className="font-mono text-sm text-gray-100">
          <div>
            <span className="text-pink-400">const</span>{" "}
            <span className="text-purple-400">coder</span>{" "}
            <span className="text-pink-400">=</span>{" "}
            <span className="text-gray-400">{"{"}</span>
          </div>
          <div className="pl-4">
            <span className="text-gray-200">name:</span>{" "}
            <span className="text-green-400">&quot;{coderData.name}&quot;,</span>
          </div>
          <div className="pl-4">
            <span className="text-gray-200">department:</span>{" "}
            <span className="text-green-400">&quot;{coderData.department}&quot;,</span>
          </div>
          <div className="pl-4">
            <span className="text-gray-200">batch:</span>{" "}
            <span className="text-green-400">&quot;{coderData.batch}&quot;,</span>
          </div>
          <div className="pl-4">
            <span className="text-gray-200">role:</span>{" "}
            <span className="text-green-400">&quot;{coderData.role}&quot;,</span>
          </div>
          <div className="pl-4">
            <span className="text-gray-200">seniority:</span>{" "}
            <span className="text-green-400">&quot;{coderData.seniority}&quot;,</span>
          </div>
          <div className="pl-4">
            <span className="text-gray-200">location:</span>{" "}
            <span className="text-green-400">&quot;{coderData.location}&quot;,</span>
          </div>
          <div className="pl-4">
            <span className="text-gray-200">skills:</span>{" "}
            <span className="text-gray-400">[</span>
            {coderData.skills.map((skill, index) => (
              <span key={skill}>
                <span className="text-cyan-400">&quot;{skill}&quot;</span>
                {index < coderData.skills.length - 1 && <span className="text-gray-400">, </span>}
              </span>
            ))}
            <span className="text-gray-400">],</span>
          </div>
          <div>
            <span className="text-gray-400">{"};"}</span>
          </div>
        </code>
      </div>
      <div className="px-4 py-2 bg-gray-900 text-xs text-gray-500 flex justify-between">
        <span>UTF-8</span>
        <span>JavaScript</span>
        <span>Ln 12, Col 2</span>
      </div>
    </div>
  );
};
