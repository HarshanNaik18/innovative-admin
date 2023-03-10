import React, { useState } from 'react'
import './AdminLogin.css'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitButtonDisable, setSubmitButtonDisable] = useState(false);
    
    const Login = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Fill all fields", {
                autoClose: 1000,
                pauseOnHover: false,
                closeOnClick: true
            });
            return;
        }
        setSubmitButtonDisable(true);

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                setSubmitButtonDisable(false);
                sessionStorage.setItem("admin", JSON.stringify(userCredential.user));
                toast.success("Admin Logged in");
                console.log("logged in");
            })
            .catch((error) => {
                setSubmitButtonDisable(false);
                toast.error("Invalid username or password", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    closeOnClick: true
                });
                console.log(error);
            })
    }
    return (
        <div className='Login_overlay'>
            <ToastContainer />
            <div className='left_img_holder'>
                <h1><strong>INNOVATIVE</strong></h1>
                <h3><strong>Unveil Your Ideas</strong></h3>
            </div>
            <div className='right_login_items'>
                <div className='wrapper'>
                    <h1>Admin Login</h1>
                    <form method='post'>
                        <input type='email' id='username' placeholder='Username' onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' id='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </form>
                    <button disabled={submitButtonDisable} onClick={Login}>Login</button>

                </div>
            </div>
        </div>
    )
}

export default AdminLogin
