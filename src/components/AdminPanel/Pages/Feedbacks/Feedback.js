import React, { useState, useEffect } from 'react'
import { db } from '../../../../Firebase/Firebase'
import { collection, onSnapshot, query } from 'firebase/firestore';
import './Feedback.css'

function Feedback() {
    const [enquies, setEnquiries] = useState([]);
    const enquiryRef = collection(db, "enquiries");
    useEffect(() => {
        const q = query(enquiryRef);
        const FetchData = onSnapshot(q, querySnapshot => {
            const data = [];
            querySnapshot.forEach(item => {
                data.push({ ...item.data(), id: item.id });
            });
            setEnquiries(data);
        });
        return () => {
            FetchData();
        }
        //eslint-disable-next-line
    }, []);
    return (
        <div className='project_main_body'>
            <div className='project_body_container'>
                <div className='feedback_header'>
                    <center><h1>Feedbacks</h1></center>
                </div>
                <div className='feedback_body'>
                    {
                        enquies.map((feedback) => (
                            <div className='border_div'>
                                <div className='feedback_card'>
                                    <div className='feedback_card_header'>
                                        <h2><i class="fa fa-user-circle-o" style={{ fontSize: '20px' }} aria-hidden="true" /> {feedback.user}</h2>
                                        <h4><i class="fa fa-envelope-o" style={{ fontSize: '20px' }} aria-hidden="true" /> {feedback.email}</h4>
                                        <h6 style={{display:'flex', flexDirection:'row',alignItems:'center', gap:'7px'}} ><i class="fa fa-clock-o" style={{ fontSize: '20px' }} aria-hidden="true" /> {feedback.time.toDate().toLocaleTimeString()} - {feedback.time.toDate().toDateString()}</h6>
                                    </div>
                                    <div className='feedback_card_body'>
                                        <p style={{marginBottom:'20px'}}>{feedback.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Feedback
