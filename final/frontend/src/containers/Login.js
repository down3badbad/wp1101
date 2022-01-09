import { useState, useEffect } from 'react'
import './Login.css'
import { useAuth } from '../hooks/useAuth';
import axios from '../api';

export default function Login() {
    const { setLogin, setUser } = useAuth();

    const validateUser = async (user, psw) => {
        const formData = new FormData();  
        formData.append('user' ,user);
        formData.append('psw' , psw);

        const res = await axios.post('/api/login', formData , {
            headers: {'Content-Type': 'multipart/form-data; '},
        });
        
        return res.data.validate;
    }

    const checkUser = async (e) => {
        const username = document.getElementById("username-field");
        const password = document.getElementById("password-field");
        const loginErrorMsg = document.getElementById("login-error-msg");

        if (await validateUser(username.value, password.value)) {
            alert("Welcome!");
            setLogin(true);
            setUser(username.value);
        }
        else {
            loginErrorMsg.style.opacity = 1;
        }
    }

    return (
        <div className = "wrap">
            <main id="main-holder">
            <h1 id="login-header">Login Page</h1>
            
            <div id="login-error-msg-holder">
                <p id="login-error-msg">Invalid username <span id="error-msg-second-line">and/or password</span></p>
            </div>
            
            <div id="login-form">
                <input type="text" name="username" id="username-field" className="login-form-field" placeholder="Username"/>
                <input type="password" name="password" id="password-field" className="login-form-field" placeholder="Password"/>
                <input type="submit" value="Login" id="login-form-submit" onClick={checkUser}/>
            </div>
            </main>
        </div>
    )
}