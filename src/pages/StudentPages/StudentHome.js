import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModuleCard from "../../components/shared/ModuleCard";
import StudentModules from './StudentModules';

export default function StudentHome() {
  const [users, setUsers] = useState([]);

  const getDatas = () => {
    const emailFromSessionStorage = sessionStorage.getItem("email");
    const url = `http://localhost:5225/api/User/GetById/${emailFromSessionStorage}`;

    axios.get(url)
      .then(response => {
        setUsers([response.data]); // Assuming the data is in the response body
      })
      .catch(error => console.error('Error fetching data: ', error));
  };
  useEffect(() => {
    // Fetch data from the API on component mount
    getDatas();
  }, []);
  return (
    <section className="">
    <div className="col-md-12">
      <div className="row mx-2 mb-0 mt-2 rounded-3 ">
        <main className="main-section">
        {users.map((user) => (
          <h4 class="display-4">Welcome Back <strong>{user.userName},</strong></h4>
          ))}
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
    </section>
  );
}
