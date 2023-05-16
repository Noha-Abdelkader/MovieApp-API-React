import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from './PeopleDetalis.module.css'

export default function PeopleDetalis() {
let params = useParams();
let [result , setResult] = useState([]);

let getPersonData = async ({personId})=>{
    let {data} = await axios.get(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=99f8d07aa52bb74ca027bcd82345cf6b&language=en-US`)
let result = data.cast;
setResult(result);
}

    useEffect(()=>{
getPersonData(params);

} , [])

return <div className='container py-5'>
<div className="row gy-5">
{result?result.map(content=>{
return <div className={`col-md-4 p-3 ${styles.contain}`}  key={content.id}>
   <div className='  position-relative overflow-hidden'>

   <div>
    {content.poster_path ? <img src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} className='w-100 rounded-2 ' alt="" />:<div className={`${styles.blank} rounded-2 w-100`}></div> }
    </div>
    
{content.poster_path ? <div className={`position-absolute p-2 end-0 start-0 top-100  rounded-2 ${styles.layer}`}>
            <h5 className={`${styles.original_title}  fw-bolder  text-center`}>{content.original_title}</h5>
            <div className="d-flex">
            {content.vote_average? <h6 className={` ${styles.vote_average} text-warning bg-black`}><i className="fa-solid fa-star "></i>{content.vote_average}</h6>:''}
           {content.vote_count ?<h6 className={` ${styles.vote_count} text-warning bg-black`}><i className="fa-solid fa-square-poll-vertical "></i>{content.vote_count}</h6>:''}
           {content.popularity?<h6 className={` ${styles.popularity} text-warning bg-black`}><i className="fa-solid fa-chart-line"></i>{content.popularity}</h6>:''}
            </div>
    
          <p >{content.overview}</p>
          {content.release_date ? <h6 className={`${styles.release_date} ${styles.icon} p-0 `}><i className="fa-solid fa-calendar-days"></i> {content.release_date}</h6>:''}
          {content.original_language?<h6 className={`fw-bolder ${styles.original_language} ${styles.icon}  d-flex align-items-center `}> <i className="fa-solid fa-globe me-2"></i>Language<p className='p-2 ms-2'>{content.original_language}</p></h6>:''}
    
            </div> : <div className={`position-absolute p-2 end-0 start-0 top-100  rounded-2 ${styles.layer}`}>
            <h5 className={`${styles.original_title}  fw-bolder  text-center`}>{content.original_title}</h5>
            <div className="d-flex">
            {content.vote_average? <h6 className={` ${styles.vote_average} text-warning bg-black`}><i className="fa-solid fa-star "></i>{content.vote_average}</h6>:''}
           {content.vote_count ?<h6 className={` ${styles.vote_count} text-warning bg-black`}><i className="fa-solid fa-square-poll-vertical "></i>{content.vote_count}</h6>:''}
           {content.popularity?<h6 className={` ${styles.popularity} text-warning bg-black`}><i className="fa-solid fa-chart-line"></i>{content.popularity}</h6>:''}
            </div>
    
          <p >{content.overview}</p>
          {content.release_date ? <h6 className={`${styles.release_date} ${styles.icon} p-0 `}><i className="fa-solid fa-calendar-days"></i> {content.release_date}</h6>:''}
          {content.original_language?<h6 className={`fw-bolder ${styles.original_language} ${styles.icon}  d-flex align-items-center `}> <i className="fa-solid fa-globe me-2"></i>Language<p className='p-2 ms-2'>{content.original_language}</p></h6>:''}
    
            </div>}
   </div>
</div>
}) :''}
</div>

</div>

}


// <div className={`rounded-2 ${styles.layer}`}></div>