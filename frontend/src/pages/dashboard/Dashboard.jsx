import React from "react";
import "./dashboard.css";
import { useCourses } from "../../context/CoursesContext";
import CourseTile from "../../components/coursecard/CourseTile";

const Dashboard = () => {
  const { enrolledCourses } = useCourses();

  return (
    <section className="learner-dashboard">
      <header className="dashboard-header">
        <h2>Your Enrolled Courses</h2>
      </header>

      <div className="dashboard-grid">
        {enrolledCourses?.length > 0 ? (
          enrolledCourses.map((course) => (
            <CourseTile key={course._id} course={course} />
          ))
        ) : (
          <p className="empty-text">You haven’t enrolled in any courses yet.</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
