import React from 'react';
import { Link, Outlet, Route, Routes } from "react-router-dom";
import ModuleCard from '../../components/shared/ModuleCard';
import StudentModules from './StudentModules';

export default function StudentProfile() {
  return (
    <div>
     {StudentModules.map((module) => (
                  <Link key={module.name} to={`/${module.link}`}>                
                    <ModuleCard
                      link={module.link}
                      name={module.name}
                    />
                  </Link>
                ))}
    </div>
  )
}
