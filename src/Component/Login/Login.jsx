import React, {  useState } from 'react';
import joi from 'joi';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';


export default function Login(props) {

  // --------default  user data -----------------------------
let [user , setUser] = useState({
  username:'',
    password:''
  })
   // --------- set loading screen---------------------------------
   let [loadingScreen , setLoadingScreen] =useState(false);
   let navigate=useNavigate();
   
  //  --------- set user data ------------------------
  function userData(e){
    let userInfo={...user};
    userInfo[e.target.placeholder]=e.target.value;
    setUser(userInfo);
  }

  // -------- api request -----------------------------------------


  async function sendData(e){
    e.preventDefault();

    if(validateUser()){
      setLoadingScreen(true);

       let response = await axios.post('https://dummyjson.com/auth/login' ,user  );
  if(response.status === 200){
    setLoadingScreen(false);

    localStorage.setItem('token', response.data.token);
    props.checkLogin();

    document.getElementById('sucessMsg').classList.replace('d-none','d-block');
  document.getElementById('failMsg').classList.replace('d-block','d-none');
  navigate('/home');
    }
    else {
      setLoadingScreen(false);  
         document.getElementById('failMsg').classList.replace('d-none','d-block');
    document.getElementById('sucessMsg').classList.replace('d-block','d-none');
      return;
      }
 
  }
  else{
    setLoadingScreen(false);  
       document.getElementById('failMsg').classList.replace('d-none','d-block');
  document.getElementById('sucessMsg').classList.replace('d-block','d-none');
    return;
    }
  
  
  
  
  }
  // "username": "hbingley1",
// "password": "CQutx25i8r",
  // "username": "atuny0",
// "password": "9uQFF1Lh"
  // ------- user validation ---------------------------------
  let [error , setErrors] = useState([]);
  
  let validateUser=()=>{
  let schema =joi.object({
    username:joi.string().alphanum().min(3).required(),
    password:joi.string().pattern(new RegExp('^[A-Za-z0-9]{5,30}$')).required()
  })
  
  let result =  schema.validate(user ,{abortEarly:false})
  if(result.error){
    
    setErrors(result.error.details);
    return false
  }
  else{
    setErrors([]);
    return true;
  }
  
  }
 
  // --------------------------------------------------------
  return<>
  {loadingScreen ? <LoadingScreen></LoadingScreen> :''}
  <div className="p-3">
  <h2 className='mb-1 text-center fw-bolder'>Login</h2>
  <form className= 'formStyle' onSubmit={(e)=>sendData(e)}>
   <div>
    <input className="inputStyle" type="text"  placeholder='username' onChange={( (e)=>userData(e))} />
  {error? error.map((msg, index) =>{
    return <div  key={index}>
    {(msg.message.includes("username") ) ? 
  <p className='text-danger'>{msg.message}</p>
   : ''}
    </div>
}):''}
  
  
  <input className="inputStyle" type="password" placeholder='password' onChange={ (e)=>userData(e)}/>
  {error? error.map((msg, index)=>{
    return <div  key={index}>
    {(msg.message.includes('password'))? <p className='text-danger'>Invalid-password, password must contain at least 5 characters or numbers</p> :''}
    </div>
      
    }):''}
   </div>

   <p id='sucessMsg' className='text-success fw-bolder text-center d-none'>Success</p>
   <p id='failMsg' className='text-danger fw-bolder text-center d-none'>Wrong data ,Please try again</p>
  <button className='submitBtn' type="submit">Login</button>
  
  </form>
    
    </div>  
    </>

}
