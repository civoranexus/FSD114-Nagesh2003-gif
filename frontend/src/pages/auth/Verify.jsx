// import React, { useState } from "react";
// import "./auth.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import ReCAPTCHA from "react-google-recaptcha";

// const Verify = () => {
//   const [otp, setOtp] = useState("");
//   const [show, setShow] = useState(false);

//   const navigate = useNavigate();
//   const { actionLoading, confirmOtp } = useAuth();

//   const onChange = (value) => {
//     console.log("Captcha value:", value);
//     setShow(true);
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     confirmOtp(Number(otp), navigate);
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-form">
//         <h2>Verify Account</h2>

//         <form onSubmit={submitHandler}>
//           <label htmlFor="otp">OTP</label>
//           <input
//             type="number"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//           />

//           <ReCAPTCHA
//             sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
//             onChange={onChange}
//           />

//           {show && (
//             <button
//               disabled={actionLoading}
//               type="submit"
//               className="common-btn"
//             >
//               {actionLoading ? "Please Wait..." : "Verify"}
//             </button>
//           )}
//         </form>

//         <p>
//           Go to <Link to="/login">Login</Link> page
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Verify;


import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();
  const { actionLoading, confirmOtp } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    confirmOtp(Number(otp), navigate);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Verify Your Email 🔐</h2>
        <p className="auth-subtitle">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={submitHandler}>
          <input
            type="number"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={() => setVerified(true)}
          />

          {verified && (
            <button disabled={actionLoading} className="auth-btn">
              {actionLoading ? "Verifying..." : "Verify"}
            </button>
          )}
        </form>

        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Verify;
