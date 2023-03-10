import './App.css';
import React, { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { auth } from './Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
function App() {
  const [user, setUser] = useState({});
  const [sessionAdmin, setAdmin]=useState();
  const admin = user?.email;
  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAdmin(JSON.parse(sessionStorage.getItem("admin")));
    })
  },[]);
  return (
    <div className="App">
      {
        (admin) ? (<AdminPanel />) : (<AdminLogin />)
      }
    </div>
  );
}

export default App;
