import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [mycourse, setMyCourse] = useState([]);

  async function fetchCourses() {
    console.log("[API Call] GET /api/course/all");
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      console.log(`[API Response] GET /api/course/all returned ${data.courses?.length} courses`);
      setCourses(data.courses);
    } catch (error) {
      console.error("[API Error] GET /api/course/all failed:", error);
    }
  }

  async function fetchCourse(id) {
    console.log(`[API Call] GET /api/course/${id}`);
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      console.log(`[API Response] GET /api/course/${id} success:`, data.course?.title);
      setCourse(data.course);
    } catch (error) {
      console.error(`[API Error] GET /api/course/${id} failed:`, error);
    }
  }

  async function fetchMyCourse() {
    console.log("[API Call] GET /api/mycourse");
    try {
      const { data } = await axios.get(`${server}/api/mycourse`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(`[API Response] GET /api/mycourse returned ${data.courses?.length} subscribed courses`);
      setMyCourse(data.courses);
    } catch (error) {
      console.log("[API Info] GET /api/mycourse info:", error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
