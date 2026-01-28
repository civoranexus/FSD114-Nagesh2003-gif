import React from "react";
import Sidebar from "./Sidebar";
import "./common.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-wrapper">
      <Sidebar />
      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
