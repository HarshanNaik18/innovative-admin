import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashBoard from './Pages/DashBoard/DashBoard'
import './AdminPanel.css'
import Users from './Pages/Users/Users'
import Projects from './Pages/Projects/Projects'
import Domains from './Pages/Domains/Domains'
import Feedback from './Pages/Feedbacks/Feedback'
import Enquires from './Pages/Enquiries/Enquires'


function AdminPanel() {
    return (
        <>
            <Router>
                <div className='panel_body'>
                    <Navbar />
                    <div className='Admin_panel_overlay'>
                        <div className='sidebar_box'> <Sidebar /> </div>
                        <div className='dashboard_box'>
                            <Routes>
                                <Route exact path='/' element={<DashBoard />} />
                                <Route exact path='/users' element={<Users />} />
                                <Route exact path='/projects' element={<Projects />} />
                                <Route exact path='/domains' element={<Domains />} />
                                <Route exact path='/feedback' element={<Feedback />} />
                                <Route exact path='/demo' element={<Enquires />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </>
    )
}

export default AdminPanel
