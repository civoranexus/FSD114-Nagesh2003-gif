import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

// Create context
const CoursesContext = createContext(null);

// Provider component
export const CoursesProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all available courses
  const loadAllCourses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${server}/api/course/all`);
      setAllCourses(response.data.courses);
    } catch (err) {
      console.error("Failed to load courses", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch single course details
  const loadCourseById = async (courseId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${server}/api/course/${courseId}`
      );
      setSelectedCourse(response.data.course);
    } catch (err) {
      console.error("Failed to load course", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch logged-in user's courses
  const loadUserCourses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`${server}/api/mycourse`, {
        headers: { token },
      });
      setEnrolledCourses(response.data.courses);
    } catch (err) {
      console.error("Failed to load user courses", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadAllCourses();
    loadUserCourses();
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        allCourses,
        selectedCourse,
        enrolledCourses,
        isLoading,
        loadAllCourses,
        loadCourseById,
        loadUserCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

// Custom hook
export const useCourses = () => useContext(CoursesContext);