import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./account.css";
import { useAuth } from "../../Context/AuthContext";

const Account = () => {
  const { currentUser, setAuthenticated, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null);
    setAuthenticated(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (!currentUser) return null;

  return (
    <section className="account-section">
      <div className="account-card">
        <h2 className="account-title">My Account</h2>

        <div className="account-details">
          <p>
            <span>Name:</span> {currentUser.name}
          </p>
          <p>
            <span>Email:</span> {currentUser.email}
          </p>
        </div>

        <div className="account-actions">
          <button
            className="account-btn primary"
            onClick={() => navigate(`/${currentUser._id}/dashboard`)}
          >
            <MdDashboard /> User Dashboard
          </button>

          {currentUser.role === "admin" && (
            <button
              className="account-btn secondary"
              onClick={() => navigate("/admin/dashboard")}
            >
              <MdDashboard /> Admin Panel
            </button>
          )}

          <button className="account-btn danger" onClick={handleLogout}>
            <IoMdLogOut /> Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Account;
