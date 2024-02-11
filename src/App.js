import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
//routes
import Home from "./pages/HomePages/Home";
import About from "./pages/HomePages/About";
import Contact from "./pages/HomePages/Contact";
import Courses from "./pages/HomePages/Courses";

import ForgotPassword from "./components/Auth/ForgotPassword";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentHome from "./pages/StudentPages/StudentHome";
import StudentProfile from "./pages/StudentPages/StudentProfile";
import StudentExamination from "./pages/StudentPages/StudentExamination";
import ViewClassPage from "./pages/StudentPages/ViewClassPage";

import TeacherHome from "./pages/TeacherPages/TeacherHome";
import AddStudentAttendance from "./pages/TeacherPages/AddStudentAttendance";
import TeacherExaminationPage from "./pages/TeacherPages/TeacherExamination";
import TeacherClassView from "./pages/TeacherPages/TeacherClassView";
import TeacherProfilePage from "./pages/TeacherPages/TeacherProfilePage";
import StudentAttendancePage from "./pages/StudentPages/StudentAttendancePage";
import AdminHome from "./pages/AdminPages/AdminHome";
import AdminProfilePage from "./pages/AdminPages/AdminProfilePage";
import AdminAttendancePage from "./pages/AdminPages/AdminAttendance";
import AdminClassManager from "./pages/AdminPages/AdminClassManager";
import AdminTeacherManager from "./pages/AdminPages/AdminTeacherManager";
import AdminStudentManager from "./pages/AdminPages/AdminStudentManager";
import AdminCommunication from "./pages/AdminPages/AdminCommunication";
import StudentLayout from "./layouts/StudentLayout";
import TeacherCommunication from "./pages/TeacherPages/TeacherCommunication";
import ViewCommunicationPage from "./pages/StudentPages/ViewCommunicationPage";
import NoPage from "./components/shared/NoPage";
import MarksManager from "./pages/TeacherPages/MarksManager";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="courses" element={<Courses />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
            <Route path="student-dashboard" element={<DashboardLayout />}>
              <Route index element={<StudentHome />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="attendance" element={<StudentAttendancePage />} />
              <Route path="examination" element={<StudentExamination />} />
              <Route path="class" element={<ViewClassPage />} />
              {/* <Route path="communication" element={<ViewCommunicationPage />} /> */}
            </Route>
            <Route path="teacher-dashboard" element={<DashboardLayout />}>
              <Route index element={<TeacherHome />} />
              <Route path="profile" element={<TeacherProfilePage />} />
              <Route path="attendance" element={<AddStudentAttendance />} />
              <Route path="examination" element={<TeacherExaminationPage />} />
              <Route path="class" element={<TeacherClassView />} />
              <Route path="results" element={<MarksManager />} />
              {/* <Route path="communication" element={<TeacherCommunication />} /> */}
            </Route>
            <Route path="admin-dashboard" element={<DashboardLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="profile" element={<AdminProfilePage />} />
              <Route path="student" element={<AdminStudentManager />} />
              <Route path="teacher" element={<AdminTeacherManager />} />
              <Route path="attendance" element={<AdminAttendancePage />} />
              <Route path="class" element={<AdminClassManager />} />
              <Route path="communication" element={<AdminCommunication />} />
            </Route>
            <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
