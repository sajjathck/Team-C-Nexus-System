import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/Auth/ProtectedRoute'; // Import the ProtectedRoute component
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
          <Route path="student-dashboard/*" element={<DashboardLayout />}>
            <Route index element={<ProtectedRoute><StudentHome /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
            <Route path="attendance" element={<ProtectedRoute><StudentAttendancePage /></ProtectedRoute>} />
            <Route path="examination" element={<ProtectedRoute><StudentExamination /></ProtectedRoute>} />
            <Route path="class" element={<ProtectedRoute><ViewClassPage /></ProtectedRoute>} />
            {/* Uncomment and protect the communication route if needed */}
            {/* <Route path="communication" element={<ProtectedRoute><ViewCommunicationPage /></ProtectedRoute>} /> */}
          </Route>
          <Route path="teacher-dashboard/*" element={<DashboardLayout />}>
            <Route index element={<ProtectedRoute><TeacherHome /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><TeacherProfilePage /></ProtectedRoute>} />
            <Route path="attendance" element={<ProtectedRoute><AddStudentAttendance /></ProtectedRoute>} />
            <Route path="examination" element={<ProtectedRoute><TeacherExaminationPage /></ProtectedRoute>} />
            <Route path="class" element={<ProtectedRoute><TeacherClassView /></ProtectedRoute>} />
            <Route path="results" element={<ProtectedRoute><MarksManager /></ProtectedRoute>} />
            {/* Uncomment and protect the communication route if needed */}
            {/* <Route path="communication" element={<ProtectedRoute><TeacherCommunication /></ProtectedRoute>} /> */}
          </Route>
          <Route path="admin-dashboard/*" element={<DashboardLayout />}>
            <Route index element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><AdminProfilePage /></ProtectedRoute>} />
            <Route path="student" element={<ProtectedRoute><AdminStudentManager /></ProtectedRoute>} />
            <Route path="teacher" element={<ProtectedRoute><AdminTeacherManager /></ProtectedRoute>} />
            <Route path="attendance" element={<ProtectedRoute><AdminAttendancePage /></ProtectedRoute>} />
            <Route path="class" element={<ProtectedRoute><AdminClassManager /></ProtectedRoute>} />
            <Route path="communication" element={<ProtectedRoute><AdminCommunication /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
