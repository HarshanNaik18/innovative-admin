import React from 'react'
import './Navbar.css'
import { auth } from '../../Firebase/Firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function Navbar() {
  const navigate = useNavigate();
  const Logout = () => {
    signOut(auth)
      .then(() => {
        toast.warning("Logged out");
        navigate('/');
        sessionStorage.removeItem("admin");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='navbar'>
      <div className='nav_logo'>
        <strong>INNOVATIVE</strong>
      </div>
      <ToastContainer />
      <div class="dropdown">
        <button class="dropbtn">Admin<span><i className='fa fa-angle-down' /></span></button>
        <div class="dropdown-content">
          {/* <b >Profile</b> */}
          <b onClick={Logout}>Logout</b>
        </div>
      </div>

    </div>
  )
}

export default Navbar
