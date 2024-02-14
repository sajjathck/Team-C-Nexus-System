import React from 'react'
import { Button } from 'bootstrap';

export default function Courses() {
  return (
    // <div>
    //   <section className="bg-light rounded-2 p-3 p-md-4 p-xl-5 min-vh-80 d-flex flex-row align-items-center"></section>
    // </div>
    <div className='container-fluid  mt-5 p-3'>
      <div className='row d-flex justify-content-center '>
        <div className='col-md-6 rounded-3'>
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="pexels-photo-301926.webp" class="d-block w-100 carousel-image" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="pic2.webp" class="d-block w-100 carousel-image" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="pic4.webp" class="d-block w-100 carousel-image" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="pexels-photo-12691637.jpeg" class="d-block w-100 carousel-image" alt="..." />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
