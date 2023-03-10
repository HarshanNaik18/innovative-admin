import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
function Sidebar() {
  return (
    <div className='sidebar_container'>
      <NavLink to='/' className='sidebar_items'> <b> <i class="fa fa-home" aria-hidden="true"/><span>Home</span></b> </NavLink>
      <NavLink to='/users' className='sidebar_items'> <b>  <i class="fa fa-users" aria-hidden="true"/><span>Users</span> </b></NavLink>
      <NavLink to='/projects' className='sidebar_items'> <b><i class="fa fa-book" aria-hidden="true"/><span>Projects</span></b></NavLink>
      <NavLink to='/domains' className='sidebar_items'> <b><i class="fa fa-folder" aria-hidden="true"/><span>Domains</span></b></NavLink>
      <NavLink to='/feedback' className='sidebar_items'> <b><i class="fa fa-commenting" aria-hidden="true"/><span>Feedbacks</span></b></NavLink>
      {/* <NavLink to='/demo' className='sidebar_items'> <b><i class="fa fa-paper-plane" aria-hidden="true"/><span>Demo</span></b></NavLink> */}
    </div>
  )
}

export default Sidebar
