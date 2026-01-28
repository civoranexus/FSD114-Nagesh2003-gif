import React from "react";
import "./courses.css";
import { useCourses } from "../../context/CoursesContext";
import CourseTile from "../../components/coursecard/CourseTile";

const Courses = () => {
  const { allCourses } = useCourses();

  return (
    <section className="courses-wrapper">
      <div className="courses-header">
        <h2 className="courses-title">Explore Our Courses</h2>
        <p className="courses-subtitle">
          Learn from expertly crafted content designed for real-world skills
        </p>
      </div>

      <div className="courses-list">
        {allCourses && allCourses.length > 0 ? (
          allCourses.map((course) => (
            <CourseTile key={course._id} course={course} />
          ))
        ) : (
          <p className="empty-state">No courses available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default Courses;
