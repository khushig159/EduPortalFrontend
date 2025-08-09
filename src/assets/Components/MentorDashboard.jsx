import React from "react";
import MentorSidebar from "./MentorSidebar";
import BlogCard from "./BlogCard";

function MentorDashboard() {
  const blogs = [
    {
      title: "The Rise of Generative AI",
      summary: "Explore how Gen AI is transforming industries like healthcare, education, and design.",
    },
    {
      title: "5 Projects Every ML Student Should Build",
      summary: "From image classification to NLP, here's a list of hands-on projects to strengthen your resume.",
    },
    {
      title: "Tips for Effective Online Mentoring",
      summary: "Build trust, communicate better, and drive results with these proven mentorship strategies.",
    },
  ];

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#f2faff] text-black overflow-hidden">
      <MentorSidebar />
      <div className="flex-1 h-screen p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold text-[#023047] mb-6">Your Blog Posts</h1>
        <div className="flex flex-wrap gap-6">
          {blogs.map((blog, idx) => (
            <BlogCard key={idx} title={blog.title} summary={blog.summary} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;
