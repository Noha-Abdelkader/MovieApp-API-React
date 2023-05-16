
import React, { useState ,useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import  "swiper/swiper-bundle.min.css" ;

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

import axios from 'axios'
import styles from './HomeSlider.module.css'


export default function HomeSlider() {

// ------ set total results ----------------------
let [results , setResults]= useState([]);

// ------- set search -----------------
let [query , setQuery]=useState('');

// --------- getData function------------
let getData = async()=>{
  let {data} = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=99f8d07aa52bb74ca027bcd82345cf6b');
  setResults (data.results);
}

// ----- useEffect fun-----------------------
useEffect(()=>{
getData();
},[])
 
// --------- showing data --------------------------------------
  return <div className="py-5 row gy-5">
  <div className="col-12  d-flex justify-content-center align-items-center fw-bolder ">
  <div  className={`${styles.homeHead} p-5 text-center`}>
  <i className={`text-warning fa-solid fa-film`}></i>
    <h3 className='fs-2 text-uppercase'>Popular movies to watch Right now</h3>
    <p className='text-muted text-center'>most watched movies by days</p>
    <input type="text" placeholder='search ...'onChange={(e)=>{setQuery(e.target.value)}} className={`rounded-2 p-2  bg-dark border-0 text-light ${styles.inputSearch} `} />

  </div>
</div>

  <div className="col-12">
  <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
       {results?  results.filter(movie=>(movie.original_title).toLowerCase().includes(query)).map((movie)=>{
    return  <SwiperSlide key={movie.id}>
 <img  src= {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}  className='w-100'  alt="" />
   </SwiperSlide>
   }):''}
      </Swiper>
  </div>
  </div>
}
