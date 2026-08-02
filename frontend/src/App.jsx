import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import About from "./pages/about/about";
import Account from "./pages/account/Account";
import { userData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Courses from "./pages/courses/Courses";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminAddCourse from "./pages/admin/AdminAddCourse";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProfile from "./pages/admin/AdminProfile";

const App = () => {
  const { isAuth, user, loading } = userData();

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC & STUDENT ROUTES (PublicLayout) */}
        <Route
          path="/"
          element={
            <PublicLayout isAuth={isAuth} user={user}>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout isAuth={isAuth} user={user}>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <PublicLayout isAuth={isAuth} user={user}>
              <Courses />
            </PublicLayout>
          }
        />
        <Route
          path="/course/:id"
          element={
            <PublicLayout isAuth={isAuth} user={user}>
              <CourseDescription />
            </PublicLayout>
          }
        />
        <Route
          path="/course/study/:id"
          element={
            isAuth ? (
              <PublicLayout isAuth={isAuth} user={user}>
                <CourseStudy />
              </PublicLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/account"
          element={
            isAuth ? (
              <PublicLayout isAuth={isAuth} user={user}>
                <Account user={user} />
              </PublicLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to={user?.role === "admin" ? "/dashboard" : "/"} />
            ) : (
              <PublicLayout isAuth={isAuth} user={user}>
                <Login />
              </PublicLayout>
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuth ? (
              <Navigate to="/" />
            ) : (
              <PublicLayout isAuth={isAuth} user={user}>
                <Register />
              </PublicLayout>
            )
          }
        />
        <Route
          path="/verify"
          element={
            isAuth ? (
              <Navigate to="/" />
            ) : (
              <PublicLayout isAuth={isAuth} user={user}>
                <Verify />
              </PublicLayout>
            )
          }
        />

        {/* DEDICATED ADMIN PORTAL ROUTES (AdminLayout) */}
        <Route
          path="/dashboard"
          element={
            isAuth && user?.role === "admin" ? (
              <AdminLayout user={user}>
                <AdminDashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isAuth && user?.role === "admin" ? (
              <AdminLayout user={user}>
                <AdminDashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/courses"
          element={
            isAuth && user?.role === "admin" ? (
              <AdminLayout user={user}>
                <AdminCourses />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/add-course"
          element={
            isAuth && user?.role === "admin" ? (
              <AdminLayout user={user}>
                <AdminAddCourse />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/users"
          element={
            isAuth && user?.role === "admin" ? (
              <AdminLayout user={user}>
                <AdminUsers />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            isAuth && user?.role === "admin" ? (
              <AdminLayout user={user}>
                <AdminOrders />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/profile"
          element={
            isAuth && user?.role === "admin" ? (
              <AdminLayout user={user}>
                <AdminProfile />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
