import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/shared/Sidebar'
import StudentModules from '../pages/StudentPages/StudentModules'

export default function StudentLayout() {
  return (
    <div>
       <div className="row mx-2 mb-0 mt-2 rounded-3 bg-light ">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light rounded-3 sidebar p-0 collapse">
          {StudentModules.map((module) => (
            <Sidebar key={module.name} link={module.link} name={module.name} />
          ))}
        </nav>
        </div>
        <main>
          <Outlet />
        </main>
        </div>
  )
}
