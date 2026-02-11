import React, { useState } from "react";
import Layout from "../Utils/Layout"
import { useNavigate } from "react-router-dom";
import { useCourses } from "../../context/CoursesContext";
import CourseTile from "../../components/coursecard/CourseTile";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
import "./admincourses.css";

const COURSE_CATEGORIES = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  const { allCourses, loadAllCourses } = useCourses();

  // 🔒 Admin guard
  if (user && user.role !== "admin") navigate("/");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    createdBy: "",
    duration: "",
  });

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const img = e.target.files[0];
    setFile(img);

    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => setPreview(reader.result);
  };

  const submitCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      payload.append(key, value)
    );
    payload.append("file", file);

    try {
      const res = await axios.post(
        `${server}/api/course/new`,
        payload,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      toast.success(res.data.message);
      loadAllCourses();

      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        createdBy: "",
        duration: "",
      });
      setPreview("");
      setFile(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="admin-course-wrapper">
        {/* LEFT – COURSE LIST */}
        <div className="course-list">
          <h2>Published Courses</h2>
          <div className="course-grid">
            {allCourses?.length ? (
              allCourses.map((course) => (
                <CourseTile key={course._id} course={course} />
              ))
            ) : (
              <p>No courses available</p>
            )}
          </div>
        </div>

        {/* RIGHT – ADD COURSE */}
        <div className="course-form-container">
          <h3>Create New Course</h3>

          <form onSubmit={submitCourse}>
            <input
              name="title"
              placeholder="Course Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              name="description"
              placeholder="Course Description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <input
              name="createdBy"
              placeholder="Instructor Name"
              value={formData.createdBy}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Choose Category</option>
              {COURSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              name="duration"
              type="number"
              placeholder="Duration (weeks)"
              value={formData.duration}
              onChange={handleChange}
              required
            />

            <input type="file" onChange={handleImage} required />

            {preview && (
              <img src={preview} alt="preview" className="image-preview" />
            )}

            <button disabled={loading} className="common-btn">
              {loading ? "Creating..." : "Add Course"}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AdminCourses;
