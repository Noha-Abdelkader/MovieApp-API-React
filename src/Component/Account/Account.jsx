import React, { useContext } from 'react'
import { userInfo } from '../../App';
import styles from './Account.module.css'

export default function Account() {

const user = useContext(userInfo);


  return <div className='p-5 container'>
<div className="row gy-5 justify-content-center align-items-end ">
  <div className="col-md-6 ">
 <div>
     
<table className={` fs-5 ${styles.table}`}>
<tr> 
<td>FirstName </td>

<td> {`${user.firstName}`} </td>
</tr>
<tr> 
<td>LastName</td>

<td> {`${user.lastName}`} </td>
</tr>
<tr> 
<td>Email</td>

<td> {`${user.email}`} </td>
</tr>
<tr> 
<td>UserName</td>

<td> {`${user.username}`} </td>
</tr>
<tr> 
<td>Gender</td>

<td> {`${user.gender}`} </td>
</tr>

</table>
 </div>

  </div>

<div className="col-md-6 d-flex justify-content-center align-items-center">
<div>
<img src={`${user.image}`} alt="userImage" />

</div>
</div>


</div>



    </div>
}
