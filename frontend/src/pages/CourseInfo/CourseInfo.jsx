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
                navigate(`/course/${selectedCourse._id}`)
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


// // import React, { useEffect, useState } from "react";
// // import "./coursedescription.css";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { CourseData } from "../../context/CourseContext";
// // import { server } from "../../main";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import { UserData } from "../../context/UserContext";
// // import Loading from "../../components/loading/Loading";

//  import React, { useEffect, useState } from "react";
//  import "./courseinfo.css";
//  import { useNavigate, useParams } from "react-router-dom";
//  import { useCourses } from "../../context/CoursesContext";
//  import { useAuth } from "../../context/AuthContext";
//  import { server } from "../../main";
//  import axios from "axios";
//  import toast from "react-hot-toast";
//  import LoadingScreen from "../../components/loading/Loader"; 

// const CourseInfo = ({ user }) => {
//   const params = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const { loadUserProfile } = useAuth();

//   const { 
//     selectedCourse,
//      loadCourseById,
//      loadAllCourses,
//      loadUserCourses,
//   } = useCourses();

//   useEffect(() => {
//     loadCourseById(params.id);
//   }, []);

//   const checkoutHandler = async () => {
//     const token = localStorage.getItem("token");
//     setLoading(true);

//     const {
//       data: { order },
//     } = await axios.post(
//       `${server}/api/course/checkout/${params.id}`,
//       {},
//       {
//         headers: {
//           token,
//         },
//       }
//     );

//     const options = {
//       key: "rzp_test_S3FmnbmsA4Eut2", // Enter the Key ID generated from the Dashboard
//       amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       currency: "INR",
//       name: "E learning", //your business name
//       description: "Learn with us",
//       order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

//       handler: async function (response) {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//           response;

//         try {
//           const { data } = await axios.post(
//             `${server}/api/verification/${params.id}`,
//             {
//               razorpay_order_id,
//               razorpay_payment_id,
//               razorpay_signature,
//             },
//             {
//               headers: {
//                 token,
//               },
//             }
//           );

//           await loadAllCourses();             
//           await loadUserCourses();
//           await loadUserProfile();
//           toast.success(data.message);
//           setLoading(false);
//           navigate(`/payment-success/${razorpay_payment_id}`);
//         } catch (error) {
//           toast.error(error.response.data.message);
//           setLoading(false);
//         }
//       },
//       theme: {
//         color: "#8a4baf",
//       },
//     };
//     const razorpay = new window.Razorpay(options);

//     razorpay.open();
//   };

//   return (
//     <>
//       {loading ? (
//         <LoadingScreen />
//       ) : (
//         <>
//           {selectedCourse && (
//             <div className="course-description">
//               <div className="course-header">
//                 <img
//                   src={`${server}/${selectedCourse.image}`}
//                   alt=""
//                   className="course-image"
//                 />
//                 <div className="course-info">
//                   <h2>{selectedCourse.title}</h2>
//                   <p>Instructor: {selectedCourse.createdBy}</p>
//                   <p>Duration: {selectedCourse.duration} weeks</p>
//                 </div>
//               </div>

//               <p>{selectedCourse.description}</p>

//               <p>Let's get started with course At ₹{selectedCourse.price}</p>

//               {user && user.subscription.includes(selectedCourse._id) ? (
//                 <button
//                   onClick={() => navigate(`/course/study/${selectedCourse._id}`)}
//                   className="common-btn"
//                 >
//                   Study
//                 </button>
//               ) : (
//                 <button onClick={checkoutHandler} className="common-btn">
//                   Buy Now
//                 </button>
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default CourseInfo;