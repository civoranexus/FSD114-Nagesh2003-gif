import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../../main";
import "./auth.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitEmailHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${server}/api/user/forgot`,
        { email: userEmail }
      );

      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-form">
        <h2>Reset Your Password</h2>

        <form onSubmit={submitEmailHandler}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter registered email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />

          <button className="common-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
