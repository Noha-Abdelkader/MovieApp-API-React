import axios from 'axios'
import React  ,{ useEffect, useState } from 'react'
import styles from './People.module.css'
import { Link } from 'react-router-dom';


export default function People() {

let [results,setResults] = useState([]);

let pages = new Array (3).fill(1);



let getPeoples = async (currentPage)=>{
  let {data} = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=99f8d07aa52bb74ca027bcd82345cf6b&language=en-US&page=${currentPage}`);
  setResults(data.results);
  }

  
useEffect(()=>{
  getPeoples(1);
},[])


return <div className='container py-5'>
  <div className="row gy-5 gx-3 mb-4 justify-content-center">
{results ?results.map(result=>{
  return <div className={`col-md-4 col-lg-2  ${styles.peopleContent}`} key={result.id}>
    <div className='position-relative overflow-hidden'>
<div >
<img src={"https://image.tmdb.org/t/p/w500/"+result.profile_path} alt="" className='w-100' />
</div>
<div className={`${styles.title} position-absolute top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center`}>
  <Link to={`/peopleDetalis/`+ result.id}  className='text-decoration-none text-white'> <h5>{result.name}</h5> </Link>
</div>
    </div>
  </div>
}):''}
  </div>
{/* ===== pagination =========== */}
<nav aria-label="Page navigation example " className='bg-transparent'>
  <ul className="pagination justify-content-center align-items-center">
  
{pages.map((page, index)=>{ return <li className={`page-item ${styles.paginate} `} key={index}><button className="page-link" onClick={()=>{getPeoples(index+1)}}>{index+1}</button></li>} )}

    
  </ul>
</nav>

</div>




}
