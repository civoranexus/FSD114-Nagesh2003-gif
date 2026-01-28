import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  // 🔐 Super Admin Guard
  if (user && user.role !== "admin") navigate("/");

  const loadUsers = async () => {
    try {
      const res = await axios.get(`${server}/api/users`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUserList(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (id) => {
    const confirmAction = window.confirm(
      "Do you really want to change this user's role?"
    );

    if (!confirmAction) return;

    try {
      const res = await axios.put(
        `${server}/api/user/${id}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      toast.success(res.data.message);
      loadUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <Layout>
      <section className="admin-users">
        <h2>User Management</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {userList.length ? (
                userList.map((u, index) => (
                  <tr key={u._id}>
                    <td>{index + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${u.role}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleRoleChange(u._id)}
                        className="common-btn small"
                      >
                        Change Role
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default AdminUsers;
