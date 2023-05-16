import React, { useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './NavBar.module.css'
import { userInfo } from '../../App';

export default function NavBar({isLogin , checkLoginState  }) {


  let navigate = useNavigate();

//------- export data from app -------------------------
const user = useContext(userInfo);

// -------- logOutFun --------------------
  function logOutFun(){
    localStorage.clear('token');
    navigate('/login');
    checkLoginState();
  }

// --- show data ------------------------------

  return <>
  <nav className="navbar navbar-expand-md  navbar-dark">
  <div className="container-fluid">
    {isLogin? <Link className="navbar-brand fs-4 fw-bolder" to='home'>Movie Hunter</Link>:<Link className="navbar-brand fs-4 fw-bolder" to='login'>Movie Hunter</Link>}

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
   <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
   
   {isLogin?  <> 
     <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-2 text-center">
        <li className="nav-item">
          <Link className={`${styles.navLink} nav-link active`} aria-current="page" to='home' >Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`${styles.navLink} nav-link `} to='movie'>Movies</Link>
        </li>
        <li className="nav-item">
          <Link className={`${styles.navLink} nav-link `} to='tvShow' >TvShow</Link>
        </li>
        <li className="nav-item">
          <Link className={`${styles.navLink} nav-link `} to='people'>People</Link>
        </li>
        <li className="nav-item">
          <Link className={`${styles.navLink} nav-link `} to='ContactUs'>ContactUs</Link>
        </li>
      </ul>

<div className='d-flex justify-content-center align-items-center'>

    {/* <ul className={`text-white list-unstyled d-flex  align-items-center mb-0 ${styles.mediaList}`}>
        <li className={`${styles.icon}`}><i className="fa-brands fa-facebook "></i></li>
        <li className={`${styles.icon}`}><i className="fa-brands fa-instagram"></i></li>
        <li className={`${styles.icon}`}><i className="fa-brands fa-youtube"></i></li>
       </ul> */}

       <div className="btn-group me-3">
  <span className={`${styles.userBtn} btn btn-secondary btn-sm`} type="button">
  {`${user}`}
  </span>

  <button type="button" className="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span className="visually-hidden">Toggle Dropdown</span>
  </button>

  <ul className="dropdown-menu bg-secondary  p-2">
  <Link  to='Account' className='text-light text-decoration-none'>Account</Link>
  
  </ul>
</div>

       <button className={`${styles.logOutBtn} btn fw-bold me-3`} type="submit" onClick={logOutFun}>LogOut</button>
    </div>
    </>:<ul className={`${styles.navBtns} d-flex justify-content-center mb-0 ps-0 `} >
       <Link to='login'>
       <button className={`${styles.loginBtn} btn fw-bold me-3`} type="submit">Login</button>       
       </Link>
       <Link to='register'>
       <button className={`${styles.registerBtn} btn  fw-bold`} type="submit" >Register</button>
         </Link>
      </ul>}
    
    </div>

    
  </div>
</nav>
  </>
}


