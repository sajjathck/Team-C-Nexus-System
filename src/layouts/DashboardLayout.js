import React, { useState, useEffect } from "react";

import { Link, Outlet } from "react-router-dom";
import HomeButton from "../components/Buttons/HomeButton";
import StudentModules from "../pages/StudentPages/StudentModules";
import Sidebar from "../components/shared/Sidebar";
import AdminModules from "../pages/AdminPages/AdminModules";
import TeacherModules from "../pages/TeacherPages/TeacherModules";

export default function DashboardLayout() {
  const [role, setRole] = useState(""); // Initialize role state
  const [dashboardlink, setLink] = useState("");
  useEffect(() => {
    const roleFromSessionStorage = sessionStorage.getItem("role");
    if (roleFromSessionStorage) {
      setRole(roleFromSessionStorage);
    
    }   
    setLink(`/${roleFromSessionStorage}-dashboard`);
  }, []);
  
  let Modules = [];
  switch (role) {
    case "admin":
      Modules = AdminModules;
      
      break;
    case "student":
      Modules = StudentModules;
     
      break;
    case "teacher":
      Modules = TeacherModules;
    
      break;
    default:
      console.log(role);
      // Default modules or empty array if role is not recognized
      Modules = [];
  }

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to={dashboardlink}>
            NeXus.
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto">
              <Link className="nav-item" to="/login">
                <HomeButton text="Logout" />
              </Link>
            </ul>
          </div>
        </div>
      </nav>
      <div className="row mx-2 mb-0 mt-2 rounded-3 bg-light ">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light rounded-3 sidebar p-0 collapse full-height">
          <div className="position-sticky pt-3">
          <ul className="sidebarlist nav flex-column">
            {Modules.map((module) => (
              <li className="nav-item border rounded-2 my-2 mx-2 " key={module.name}>
              <Link to={module.link} className="nav-side-text nav-link ">
                {module.name}
              </Link>
            </li>
            ))}
            </ul>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="">
              {console.log(role)}
              {role === "student" && "Student Dashboard"}
              {role === "teacher" && "Teacher Dashboard"}
              {role === "admin" && "Admin Dashboard"}
            </h1>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
