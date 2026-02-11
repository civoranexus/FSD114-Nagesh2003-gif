import React from "react";
import "./test.css";

const Test = () => {
  const feedbackList = [
    {
      id: 1,
      fullName: "Aarav Mehta",
      role: "Computer Science Student",
      review:
        "Civora Nexus transformed the way I study. The structured courses and practical approach helped me crack my internship interview.",
      avatar:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      fullName: "Riya Sharma",
      role: "Frontend Developer",
      review:
        "The platform’s UI and course flow are amazing. I finally feel confident building real-world projects on my own.",
      avatar:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      fullName: "Kunal Verma",
      role: "Engineering Undergraduate",
      review:
        "The learning paths are extremely well designed. Each module builds perfectly on the previous one.",
      avatar:
        "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      id: 4,
      fullName: "Sneha Kulkarni",
      role: "MERN Stack Learner",
      review:
        "Thanks to Civora Nexus, I built my first full-stack project. The mentorship and content quality are outstanding.",
      avatar:
        "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section className="reviews-section">
      <h2 className="reviews-heading">Learners Love Eduvillage E-Learning Courses</h2>

      <div className="reviews-grid">
        {feedbackList.map((item) => (
          <div className="review-card" key={item.id}>
            <img src={item.avatar} alt={item.fullName} className="review-avatar" />

            <p className="review-text">"{item.review}"</p>

            <div className="review-user">
              <h4>{item.fullName}</h4>
              <span>{item.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Test;
