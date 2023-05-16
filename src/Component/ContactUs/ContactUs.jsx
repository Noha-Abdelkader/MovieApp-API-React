import React from 'react'
import styles from './ContactUs.module.css'


export default function About() {
  return <div className={`${styles.contact_container} d-flex  justify-content-end align-items-end` } style={{backgroundImage:`url(https://img.freepik.com/free-vector/film-strip-with-light-effect-cinema-background_1017-38171.jpg?w=1060&t=st=1681635562~exp=1681636162~hmac=d422fd4d118db3a61a45b4479e18a5899658c90219b34b31f7cd0365f2fd6d02)`}}>

   <div className={`rounded-5 p-4 ${styles.contact_inputs}`}  >
   <span className='d-flex justify-content-center align-items-center'><h3 className='fw-bolder'>Movie Hunter</h3>  <i className="fa-solid fa-film fs-3 text-warning ps-3"></i></span>
   <div className={`${styles.inputs}`}>
    <input type="text" placeholder='Enter Your Mail Address' />
    <textarea name="" id=""  placeholder='Message'></textarea>
   </div>
    </div>

    </div>
   

}
