import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // 🔐 Login
  const signIn = async (email, password, navigate, loadUserCourses) => {
    setActionLoading(true);
    try {
      const response = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(response.data.message);
      console.log("Login Response:", response.data);
      localStorage.setItem("token", response.data.token);

      setCurrentUser(response.data.user);
      setAuthenticated(true);

      navigate("/");
      loadUserCourses?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
      setAuthenticated(false);
    } finally {
      setActionLoading(false);
    }
  };

  // 📝 Register
  const signUp = async (name, email, password, role, navigate) => {
    setActionLoading(true);
    try {
      const response = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
        role
      });

      toast.success(response.data.message);
      console.log("Registration Response:", response.data);
      localStorage.setItem(
        "activationToken",
        response.data.activationToken
      );

      navigate("/verify");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Verify OTP
  const confirmOtp = async (otp, navigate) => {
    setActionLoading(true);
    try {
      const activationToken = localStorage.getItem("activationToken");

      const response = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(response.data.message);
      console.log("OTP Verification Response:", response.data);
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      setActionLoading(false);
    }
  };

  // 👤 Fetch Logged-In User
  const loadUserProfile = async () => {
    try {
      const response = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setCurrentUser(response.data.user);
      console.log("User Profile:", response.data);
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authenticated,
        actionLoading,
        initialLoading,
        signIn,
        signUp,
        confirmOtp,
        loadUserProfile,
        setCurrentUser,
        setAuthenticated,
      }}
    >
      {children}
      <Toaster position="top-right" />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
