import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NotFound from '../NotFound/NotFound';
import styles from './MovieDetails.module.css'

export default function MovieDetails() {
    let params = useParams();
    let [movieData , setMovieData ]= useState({});


 const getMovieData = async ({movieId})=>{
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=99f8d07aa52bb74ca027bcd82345cf6b`);
        setMovieData(data);
    }

    useEffect(()=>{
getMovieData(params);

    } , [])


return<> {movieData? <div>
    <div >
        <p className="p-3 mb-0"> <Link className='fw-bolder text-light text-decoration-none' to='/home'>Home</Link> <i className="fa-solid fa-arrow-right-long"></i> {movieData.original_title}  </p>
    </div>
    
     <div className={`${styles.movieContainer}`} style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500${movieData.poster_path})`}}>
    <div className={`${styles.layer} overflow-hidden`}>
        <div className="container">
    <div className='row justify-content-around align-items-center gy-4'>
        
        <div className="col-md-4  position-relative ">
            <img src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} className={`w-100  rounded-5 ${styles.poster} `} alt="" />
          <h6 className={`${styles.status} bg-danger rounded-pill text-dark fw-bolder px-3 py-2 text-center`}>{movieData.status}</h6>
    
        </div>
    
        <div className="col-md-6">
            <div >
            <h5 className={`${styles.original_title} fs-3 fw-bolder mb-4 `}>{movieData.original_title}</h5>
            <div className="d-flex mb-3">
            {movieData.vote_average? <h6 className={` ${styles.vote_average} text-warning bg-black`}><i className="fa-solid fa-star "></i>{movieData.vote_average}</h6>:''}
           {movieData.vote_count ?<h6 className={` ${styles.vote_count} text-warning bg-black`}><i className="fa-solid fa-square-poll-vertical "></i>{movieData.vote_count}</h6>:''}
           {movieData.popularity?<h6 className={` ${styles.popularity} text-warning bg-black`}><i className="fa-solid fa-chart-line"></i>{movieData.popularity}</h6>:''}
            </div>
    
          <p className='mb-4 lh-lg'>{movieData.overview}</p>
          <div className="d-flex align-items-center mb-3" >
            <h6 className={`fw-bolder ${styles.icon}`}><i className="fa-solid fa-tags"></i> Tags</h6>
          {movieData.genres? movieData.genres.map(g=><p key={g.id} className={`${styles.geners} my-0`}>{g.name}</p>):''}
          </div>
          {movieData.origin_country?<h6 className={`${styles.origin_country} ${styles.icon} mb-3` }> {movieData.origin_country}</h6>:''}
          {movieData.release_date ? <h6 className={`${styles.release_date} ${styles.icon} m-0 p-0 mb-3`}><i className="fa-solid fa-calendar-days"></i> {movieData.release_date}</h6>:''}
          {movieData.original_language?<h6 className={`fw-bolder ${styles.original_language} ${styles.icon} mb-3  d-flex align-items-center `}> <i className="fa-solid fa-globe me-2"></i>Language<p className='p-2 ms-2'>{movieData.original_language}</p></h6>:''}
    
            </div>
        </div>
    </div> 
    
     </div> 
    
    </div>
    </div>
    
    </div>: <NotFound></NotFound> }
    </>


}
