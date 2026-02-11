import React, { useEffect, useState } from "react";
import "./courseinfo.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../context/CoursesContext";
import { useAuth } from "../../context/AuthContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/loading/Loader"; 


const CourseInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paymentLoading, setPaymentLoading] = useState(false);

  // 🔐 AuthContext
  const { currentUser } = useAuth();

  // 📚 CoursesContext
  const {
    selectedCourse,
    loadCourseById,
    loadAllCourses,
    loadUserCourses,
  } = useCourses();

  useEffect(() => {
    loadCourseById(id);
  }, [id]);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setPaymentLoading(true);

    try {
      const {
        data: { order },
      } = await axios.post(
        `${server}/api/course/checkout/${id}`,
        {},
        {
          headers: { token },
        }
      );

      const options = {
        key: "rzp_test_S3FmnbmsA4Eut2",
        currency: "INR",
        name: "Eduvillage",
        description: "Learn & Grow",
        order_id: order.id,

        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              `${server}/api/verification/${id}`,
              response,
              {
                headers: { token },
              }
            );

            await loadAllCourses();
            await loadUserCourses();

            toast.success(verifyResponse.data.message);
            navigate(`/payment-success/${response.razorpay_payment_id}`);
          } catch (err) {
            toast.error(
              err?.response?.data?.message || "Payment verification failed"
            );
          } finally {
            setPaymentLoading(false);
          }
        },

        theme: {
          color: "#8a4baf",
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      toast.error("Unable to initiate payment");
      setPaymentLoading(false);
    }
  };

  if (paymentLoading) return <LoadingScreen />;
  if (!selectedCourse) return null;

  return (
    <section className="course-detail-wrapper">
      <div className="course-detail-card">
        <div className="course-media">
          <img
            src={`${server}/${selectedCourse.image}`}
            alt={selectedCourse.title}
          />
        </div>

        <div className="course-details">
          <h1>{selectedCourse.title}</h1>

          <div className="course-meta">
            <span>Instructor: {selectedCourse.createdBy}</span>
            <span>Duration: {selectedCourse.duration} weeks</span>
          </div>

          <p className="course-desc">
            {selectedCourse.description}
          </p>

          <p className="course-price">
            Enroll at <strong>₹{selectedCourse.price}</strong>
          </p>

          {currentUser?.subscription?.includes(selectedCourse._id) ? (
            <button
              className="primary-btn"
              onClick={() =>
                navigate(`/course/study/${selectedCourse._id}`)
              }
            >
              Continue Learning
            </button>
          ) : (
            <button className="primary-btn" onClick={checkoutHandler}>
              Buy Course
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseInfo;
