import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { db } from '../../../../Firebase/Firebase';
import './DashBoard.css'
function DashBoard() {
  const [veifiedUsers, setVerifiedUder] = useState(0);
  const [verifedProjects, setVerifiedProjects] = useState(0);
  const [unveifiedUsers, setUnverifiedUder] = useState(0);
  const [unverifedProjects, setUnverifiedProjects] = useState(0);
  const userRef = collection(db, "users");
  const projectRef = collection(db, "projects")
  useEffect(() => {
    const q1 = query(userRef, where("flag", "==", false));
    const q2 = query(userRef, where("flag", "==", true));
    const q3 = query(projectRef, where("flag", "==", false));
    const q4 = query(projectRef, where("flag", "==", true));

    const unverifiedUsersData = onSnapshot(q1, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach(item => {
        data.push({ ...item.data(), id: item.id });
      });
      setUnverifiedUder(data.length);
    });
    const verifiedUsersData = onSnapshot(q2, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach(item => {
        data.push({ ...item.data(), id: item.id });
      });
      setVerifiedUder(data.length);
    });
    const unverifiedProjectData = onSnapshot(q3, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach(item => {
        data.push({ ...item.data(), id: item.id });
      });
      setUnverifiedProjects(data.length);
    });
    const verifiedProjectData = onSnapshot(q4, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach(item => {
        data.push({ ...item.data(), id: item.id });
      });
      setVerifiedProjects(data.length);
    });

    return () => {
      unverifiedUsersData();
      verifiedUsersData();
      unverifiedProjectData();
      verifiedProjectData();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className='main_dash_conatainer'>
      <div className='dash_box_container'>
        <div className='dash_msg'><h3>Welcome back Admin!!!</h3></div>
        <div className='box_holder'>
          <div class="card">
            <div class="card2">
              <h1>{verifedProjects}</h1>
              <h4>No of Projects</h4>
            </div>
          </div>
          <div class="card">
            <div class="card2">
            <h1>{veifiedUsers}</h1>
            <h4>No of Users</h4>
            </div>
          </div>
          <div class="card">
            <div class="card2">
            <h1>{unverifedProjects}</h1>
            <h4>No of unverified Projects</h4>
            </div>
          </div>
          <div class="card">
            <div class="card2">
            <h1>{unveifiedUsers}</h1>
            <h4>No of unverified Users</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
