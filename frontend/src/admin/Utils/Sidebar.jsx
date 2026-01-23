import React from "react";
import "./common.css";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { currentUser } = useAuth();

  return (
    <aside className="admin-sidebar">
      <ul className="menu-list">
        <li className="menu-item">
          <Link to="/admin/dashboard">
            <AiFillHome className="menu-icon" />
            <span className="menu-text">Dashboard</span>
          </Link>
        </li>

        <li className="menu-item">
          <Link to="/admin/course">
            <FaBook className="menu-icon" />
            <span className="menu-text">Courses</span>
          </Link>
        </li>

        {currentUser?.mainrole === "superadmin" && (
          <li className="menu-item">
            <Link to="/admin/users">
              <FaUserAlt className="menu-icon" />
              <span className="menu-text">Users</span>
            </Link>
          </li>
        )}

        <li className="menu-item logout">
          <Link to="/account">
            <AiOutlineLogout className="menu-icon" />
            <span className="menu-text">Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
