import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes({childern}) {
    if(localStorage.token){
        return childern;
    }
    else{
      return  <Navigate to='/login'></Navigate>
    }
}
