import React, { useEffect } from "react";
import "./learncourse.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../context/CoursesContext";
import { server } from "../../main";

const LearnCourse = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loadCourseById, selectedCourse } = useCourses();
  // 🔐 Access Control
  useEffect(() => {
    if (
      user &&
      user.role !== "admin" &&
      !user.subscription?.includes(id)
    ) {
      navigate("/");
    }
  }, [user, id, navigate]);

  useEffect(() => {
    loadCourseById(id);
  }, [id]);

  if (!selectedCourse) return null;

  return (
    <section className="study-wrapper">
      <div className="study-card">
        <img
          src={`${server}/${selectedCourse.image}`}
          alt={selectedCourse.title}
          className="study-image"
        />

        <div className="study-info">
          <h2>{selectedCourse.title}</h2>
          <p className="study-desc">{selectedCourse.description}</p>
          <div className="study-meta">
            <span>Instructor: {selectedCourse.createdBy}</span>
            <span>Duration: {selectedCourse.duration} weeks</span>
          </div>
          <Link to={`/lectures/${selectedCourse._id}`} className="lecture-link">
            View Lectures
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearnCourse;
