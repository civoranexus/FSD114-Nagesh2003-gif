import React from "react";
import "./courseTile.css";
import { server } from "../../main";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CourseTile = ({ course }) => {
  const navigate = useNavigate();
  const { currentUser, authenticated } = useAuth();

  const handleCourseDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(
        `${server}/api/course/${course._id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(response.data.message);
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleNavigation = () => {
    if (!authenticated) {
      navigate("/login");
      return;
    }

    if (
      currentUser?.role === "admin" ||
      currentUser?.subscription?.includes(course._id)
    ) {
      navigate(`/course/${course._id}`);
    } else {
      navigate(`/course/${course._id}`);
    }
  };

  return (
    <div className="course-card">
      <img
        src={`${server}/${course.image}`}
        alt={course.title}
        className="course-image"
      />

      <h3>{course.title}</h3>
      <p>Instructor - {course.createdBy}</p>
      <p>Duration - {course.duration} weeks</p>
      <p>Price - ₹{course.price}</p>

      <button className="common-btn" onClick={handleNavigation}>
        {!authenticated
          ? "Get Started"
          : currentUser?.subscription?.includes(course._id) ||
            currentUser?.role === "admin"
          ? "Study"
          : "Get Started"}
      </button>

      {currentUser?.role === "admin" && (
        <>
          <br />
          <button
            className="common-btn"
            style={{ background: "red" }}
            onClick={handleCourseDelete}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default CourseTile;
