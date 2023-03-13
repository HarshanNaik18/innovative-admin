import './App.css';
import React, { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { auth } from './Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
function App() {
  const [user, setUser] = useState({});
  const [sessionAdmin, setSessionAdmin] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const admin = user?.email;
  useEffect(() => {
    const getSessionAdnin = () => {
      setSessionAdmin(JSON.parse(sessionStorage.getItem("admin")));
    }
    return () => {
      getSessionAdnin();
    }
  }, []);
  return (
    <div className="App">
      {
        (admin) ? (<AdminPanel />) : (<AdminLogin />)
      }
    </div>
  );
}

export default App;
