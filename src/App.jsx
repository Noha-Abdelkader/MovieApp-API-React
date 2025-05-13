import styles from './App.module.css';
import React, { createContext, useEffect, useRef, useState } from 'react';
import NavBar from './Component/NavBar/NavBar';
import Home from './Component/Home/Home';
import Movie from './Component/Movie/Movie';
import TvShow from './Component/TvShow/TvShow';
import People from './Component/People/People';
import ContactUs from './Component/ContactUs/ContactUs';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NotFound from './Component/NotFound/NotFound';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import MovieDetails from './Component/MovieDetails/MovieDetails';
import PeopleDetalis from './Component/PeopleDetalis/PeopleDetalis'
import jwtDecode from 'jwt-decode';
import Account from './Component/Account/Account'

//--------- context -------------------------
export const userInfo = createContext();


// --- app func ----------------------------
function App() {

  // ----------------------------
let navigate = useNavigate();
let [login , setLogin] = useState(false);
let [user , setUser] = useState({})
let refBtn = useRef('off');



// ------ checkLogin Func--------------------
function checkLoginState(){
  if(localStorage.token){
    setLogin(true);
    setUser(jwtDecode(localStorage.token))
    navigate('/home');
  }
  else{
    setLogin(false);
    navigate('/login')
  }
}
// --- upBtnFun --------------------------
const upBtnFun = () =>{
window.scroll({
  top:0,
  behavior:'smooth'
})
}
// -------------------------------------
useEffect(()=>{
    refBtn.current.style.display='none';
    
  window.onscroll = ()=>{
    if(window.scrollY> 400){
      refBtn.current.style.display='block';
    }
    else{
      refBtn.current.style.display='none';
    }
  }

} , [])

// ------- use effect func ------------------------
useEffect(()=>{
  checkLoginState();
} ,[login])

// ------- display data -------------------------- 
  return <>
   <userInfo.Provider value={user.firstName}> 
  <NavBar isLogin={login} checkLoginState={checkLoginState}/>
 </userInfo.Provider>

<div className='m-0 p-0'>
<Routes>
     <Route path="/" element={ <Home/> } ></Route>

     <Route path="movieDetails/:movieId" element={<MovieDetails/>  }></Route>
     
     <Route path="home" element={ <Home/>} ></Route>
     <Route path='movie' element={ <Movie/>} ></Route>
     <Route path='people' element={<People/>}></Route>

     <Route path='peopleDetalis/:personId' element={<PeopleDetalis/>}></Route>
     
     <Route path='tvShow' element={<TvShow/>}></Route>
     <Route path='ContactUs' element={<ContactUs/>}></Route>
     <Route path='register' element={<Register/>}></Route>

     <Route path='login' element={<Login checkLogin={checkLoginState}/>} ></Route>
     <Route  path='*' element={<NotFound/>}></Route>

     <Route path='Account' element={<userInfo.Provider value={user}> <Account/> </userInfo.Provider>}></Route>

  </Routes>
</div>

<div ref={refBtn} className={` ${styles.upBtn} `} onClick={()=>{upBtnFun()}} >
<i className="fa-solid fa-square-caret-up "></i>
</div>
  </>
}

export default App;
