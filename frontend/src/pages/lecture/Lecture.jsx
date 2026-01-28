import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import LoadingScreen from "../../components/loading/Loader"; 
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const Lecture = ({ user }) => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const [allLectures, setAllLectures] = useState([]);
  const [activeLecture, setActiveLecture] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const [progressInfo, setProgressInfo] = useState({
    percentage: 0,
    completed: 0,
    total: 0,
    completedLectures: [],
  });

  // 🔐 Access check
  if (
    user &&
    user.role !== "admin" &&
    !user.subscription.includes(courseId)
  ) {
    navigate("/");
  }

  // 📚 Fetch all lectures
  const loadLectures = async () => {
    try {
      const res = await axios.get(`${server}/api/lectures/${courseId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setAllLectures(res.data.lectures);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  // 🎥 Fetch single lecture
  const loadLecture = async (lectureId) => {
    setVideoLoading(true);
    try {
      const res = await axios.get(`${server}/api/lecture/${lectureId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setActiveLecture(res.data.lecture);
    } catch (err) {
      console.error(err);
    } finally {
      setVideoLoading(false);
    }
  };

  // 📊 Fetch progress
  const loadProgress = async () => {
    try {
      const res = await axios.get(
        `${server}/api/user/progress?course=${courseId}`,
        { headers: { token: localStorage.getItem("token") } }
      );

      setProgressInfo({
        percentage: res.data.courseProgressPercentage,
        completed: res.data.completedLectures,
        total: res.data.allLectures,
        completedLectures: res.data.progress[0]?.completedLectures || [],
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ➕ Add progress
  const markCompleted = async (lectureId) => {
    try {
      await axios.post(
        `${server}/api/user/progress?course=${courseId}&lectureId=${lectureId}`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      loadProgress();
    } catch (err) {
      console.error(err);
    }
  };

  // 📤 Video change
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // 📝 Add lecture
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", videoFile);

    try {
      const res = await axios.post(
        `${server}/api/course/${courseId}`,
        formData,
        { headers: { token: localStorage.getItem("token") } }
      );

      toast.success(res.data.message);
      setShowForm(false);
      setTitle("");
      setDescription("");
      setPreview("");
      loadLectures();
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setBtnLoading(false);
    }
  };

  // 🗑 Delete lecture
  const deleteLecture = async (lectureId) => {
    if (!window.confirm("Delete this lecture?")) return;

    try {
      const res = await axios.delete(
        `${server}/api/lecture/${lectureId}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      toast.success(res.data.message);
      loadLectures();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    loadLectures();
    loadProgress();
  }, []);

  if (pageLoading) return <LoadingScreen />;

  return (
    <>
      <div className="progress-box">
        Completed {progressInfo.completed} / {progressInfo.total}
        <progress value={progressInfo.percentage} max="100" />
        {progressInfo.percentage}%
      </div>

      <div className="lecture-layout">
        {/* LEFT */}
        <section className="video-section">
          {videoLoading ? (
            <LoadingScreen />
          ) : activeLecture ? (
            <>
              <video
                src={`${server}/${activeLecture.video}`}
                controls
                autoPlay
                onEnded={() => markCompleted(activeLecture._id)}
              />
              <h2>{activeLecture.title}</h2>
              <p>{activeLecture.description}</p>
            </>
          ) : (
            <h2>Select a lecture to start</h2>
          )}
        </section>

        {/* RIGHT */}
        <aside className="sidebar">
          {user?.role === "admin" && (
            <button
              className="common-btn"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Close Form" : "Add Lecture"}
            </button>
          )}

          {showForm && (
            <div className="lecture-form">
              <h3>New Lecture</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <input type="file" onChange={handleVideoChange} required />
                {preview && <video src={preview} controls />}
                <button disabled={btnLoading} className="common-btn">
                  {btnLoading ? "Uploading..." : "Save Lecture"}
                </button>
              </form>
            </div>
          )}

          {allLectures.length ? (
            allLectures.map((lec, idx) => (
              <div key={lec._id}>
                <div
                  className={`lecture-item ${
                    activeLecture?._id === lec._id ? "active" : ""
                  }`}
                  onClick={() => loadLecture(lec._id)}
                >
                  {idx + 1}. {lec.title}
                  {progressInfo.completedLectures.includes(lec._id) && (
                    <TiTick className="tick" />
                  )}
                </div>

                {user?.role === "admin" && (
                  <button
                    className="delete-btn"
                    onClick={() => deleteLecture(lec._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No lectures available</p>
          )}
        </aside>
      </div>
    </>
  );
};

export default Lecture;
