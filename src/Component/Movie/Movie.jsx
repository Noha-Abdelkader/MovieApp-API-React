import React , { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Movie.module.css'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { Link} from 'react-router-dom'


export default function Movie() {

  // ----- set results--------------------------
let [resultsTopRated , setResultsTopRated]= useState([]);
let [resultNowPlaying , setResultsNowPlaying] = useState([]);
let [resultUpcoming , setResultsUpcoming] = useState([]);

// ------- search ------------------
let [queryTopRated , setQueryTopRated]= useState('');
let [queryNowPlaying , setQueryNowPlaying]= useState('');
let [queryUpComing , setQueryUpComing]= useState('');

// ---------------------------------
let pages = new Array (4).fill(1);


// - get data func --------------------
let getData = async(type , setFun , pgNum)=>{
  let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=99f8d07aa52bb74ca027bcd82345cf6b&page=${pgNum}`);
  setFun(data.results);
}

// lefting stating up

// ----- use effect func -----------------
useEffect(()=>{ 
getData( 'top_rated' , setResultsTopRated , 1);
getData( 'now_playing' , setResultsNowPlaying , 1);
getData( 'upcoming' , setResultsUpcoming , 1);
},[])


// ---- showing data ----------------------------------
return <div className=' p-4'>
  
{/* ----- Top rated data ---------------------------- */}
<div className='row  py-5 gy-4 justify-content-center'>

<div className="col-md-6 col-lg-4 d-flex justify-content-center align-items-center fw-bolder">
  <div className={`${styles.homeHead} mb-3 text-center` }>
  <i className={`text-warning fa-solid fa-film`}></i>
    <h3 className='fs-2 text-uppercase'>Top rated movies to watch Right now</h3>
    <p className='text-muted'>most watched movies by days</p>
    <input type="text" placeholder='search ...'onChange={(e)=>{setQueryTopRated(e.target.value)}} className={`rounded-2 p-2  bg-dark border-0 text-light ${styles.inputSearch} `} />

  </div>

</div>
  {resultsTopRated ? resultsTopRated.filter(movie=>((movie.original_title).includes(queryTopRated))).map((movie)=>{
  return<div className='col-md-4 col-xl-2 ' key={movie.id}>
   <div className={` position-relative ${styles.singleMovie} `}>
   <div>
    <img src= {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}  className='w-100'  alt="" />
    </div>

    <div className={` position-absolute top-0 end-0 bottom-0 start-0 `}>
     
      <h6 className={` ${styles.vote_average} bg-warning`}><i className="fa-solid fa-star "></i> {movie.vote_average}</h6>
      <Link to={'/movieDetails/'+ movie.id} >  <h6 className={`${styles.play}`}><i className="fa-regular fa-circle-play  text-white fs-2 "></i></h6> </Link>
      <h6 className={` ${styles.vote_count} bg-warning`}><i className="fa-solid fa-square-poll-vertical "></i> {movie.vote_count}</h6>
      <h6 className={` ${styles.popularity} bg-warning`}><i className="fa-solid fa-chart-line"></i> {movie.popularity}</h6>
     <h6 className={`fw-bolder ${styles.original_language} bg-warning`}> {movie.original_language}</h6>
     <h6> {movie.homepage}</h6>
    </div>
   </div>
   
  </div>
  
 })
  :<LoadingScreen/>}
   
   <ul className="pagination justify-content-center align-items-center">
  {pages.map((page, index)=>{ return <li className={`${styles.paginate} page-item`} key={index}><button className="page-link fw-bolder "  onClick={()=>{getData('top_rated' , setResultsTopRated , index+1)}}>{index+1}</button></li>} )}
  </ul>
</div>
{/* ------- Now Playing ---------------------------- */}
<div className='row py-5 gy-3 justify-content-center'>
<div className="col-md-6 col-lg-4 d-flex justify-content-center align-items-center fw-bolder">
  <div className={`${styles.homeHead}`}>
  <i className={`text-warning fa-solid fa-film`}></i>
    <h3 className='fs-2 text-uppercase'>Now Playing movies to watch Right now</h3>
    <p className='text-muted'>most watched movies by days</p>
    <input type="text" placeholder='search ...' onChange={(e)=>{setQueryNowPlaying(e.target.value)}} className={`rounded-2 p-2  bg-dark border-0 text-light ${styles.inputSearch} `} />

  </div>
</div>
  {resultNowPlaying ?  resultNowPlaying.filter(movie=>(movie.original_title).toLowerCase().includes(queryNowPlaying)).map((movie)=>{
   return <div className='col-md-4 col-xl-2 ' key={movie.id}>
    <div className={` position-relative ${styles.singleMovie} `}>
    <div>
     <img src= {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}  className='w-100'  alt="" />
     </div>

     <div className={`  position-absolute top-0 end-0 bottom-0 start-0 `}>
      
       <h6 className={` ${styles.vote_average} bg-warning`}><i className="fa-solid fa-star "></i> {movie.vote_average}</h6>

       {/* <Link to={`/movieDetails/${movie.id}`} >  <h6 className={`${styles.play}`}><i className="fa-regular fa-circle-play  text-white fs-2 "></i></h6> </Link> */}
       <Link to={'/movieDetails/'+ movie.id} >  <h6 className={`${styles.play}`}><i className="fa-regular fa-circle-play  text-white fs-2 "></i></h6> </Link>
       
       <h6 className={` ${styles.vote_count} bg-warning`}><i className="fa-solid fa-square-poll-vertical "></i> {movie.vote_count}</h6>
       <h6 className={` ${styles.popularity} bg-warning`}><i className="fa-solid fa-chart-line"></i> {movie.popularity}</h6>
      <h6 className={`fw-bolder ${styles.original_language} bg-warning`}> {movie.original_language}</h6>
     </div>
    </div>
   </div>
  }) :<LoadingScreen/>}
  <ul className="pagination justify-content-center align-items-center">
  {pages.map((page, index)=>{ return <li className={`${styles.paginate} page-item`} key={index}><button className="page-link fw-bolder "  onClick={()=>{getData('now_playing' , setResultsNowPlaying , index+1)}}>{index+1}</button></li>} )}
  </ul>
</div>
{/* -----  Upcoming------------------------------------ */}
<div className='row  py-5 gy-3 justify-content-center'>
<div className="col-md-6 col-lg-6 d-flex justify-content-center align-items-center fw-bolder">
  <div className={`${styles.homeHead} text-center` }>
  <i className={`text-warning fa-solid fa-film`}></i>
    <h3 className='fs-2 text-uppercase'>UpComing movies to watch Right now</h3>
    <p className='text-muted'>most watched movies by days</p>
    <input type="text" placeholder='search ...'onChange={(e)=>{setQueryUpComing(e.target.value)}} className={`rounded-2 p-2  bg-dark border-0 text-light ${styles.inputSearch} `} />

  </div>
</div>
  {resultUpcoming ? resultUpcoming.filter(movie=>(movie.original_title).toLowerCase().includes(queryUpComing)).map((movie)=>{
   return <div className='col-md-4  col-xl-2'  key={movie.id}>
    <div className={` position-relative ${styles.singleMovie} `}>
    <div>
     <img src= {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}  className='w-100'  alt="" />
     </div>

     <div className={` ${styles.homeOverlay} position-absolute top-0 end-0 bottom-0 start-0 `}>
      
       <h6 className={` ${styles.vote_average} bg-warning`}><i className="fa-solid fa-star "></i> {movie.vote_average}</h6>
       <Link to={`/movieDetails/${movie.id}`} >  <h6 className={`${styles.play}`}><i className="fa-regular fa-circle-play  text-white fs-2 "></i></h6> </Link>
       <h6 className={` ${styles.vote_count} bg-warning`}><i className="fa-solid fa-square-poll-vertical "></i> {movie.vote_count}</h6>
       <h6 className={` ${styles.popularity} bg-warning`}><i className="fa-solid fa-chart-line"></i> {movie.popularity}</h6>
      <h6 className={`fw-bolder ${styles.original_language} bg-warning`}> {movie.original_language}</h6>
     </div>
    </div>
   </div>
  }) :<LoadingScreen/>}
  <ul className="pagination justify-content-center align-items-center">
  {pages.map((page, index)=>{ return <li className={`${styles.paginate} page-item`} key={index}><button className="page-link fw-bolder " onClick={()=>{getData('upcoming' , setResultsUpcoming , index+1)}}>{index+1}</button></li>} )}
  </ul>
</div>
</div>
}
