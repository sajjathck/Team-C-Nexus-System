import React from "react";
import ModuleCard from "../../components/shared/ModuleCard";
import StudentModules from './StudentModules';

export default function StudentHome() {
  return (
    <div className="col-md-12">
      <div className="row mx-2 mb-0 mt-2 rounded-3 bg-light ">
        <main className="main-section">
          <div className="container-fluid">
            <div className="row justify-content-between align-items-center g-2">
              <div className="col">
                <div className="row row-cols-3 mb-5 mx-auto">
                  {StudentModules.map((module) => (
                    <ModuleCard
                      key={module.name}
                      link={module.link}
                      name={module.name}
                    ></ModuleCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
