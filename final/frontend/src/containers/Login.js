import { useState, useEffect } from 'react'
import './Login.css'
import { useAuth } from '../hooks/useAuth';
import axios from '../api';
// import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";

export default function Login() {
    const { setData, setLogin, setUser } = useAuth();

    const validateUser = async (user, psw) => {
        const formData = new FormData();
        let encrypt_psw = bcrypt.hashSync(psw, '$2a$10$CwTycUXWue0Thq9StjUM0u');
        formData.append('user' ,user);
        formData.append('psw' , encrypt_psw);

        let output = false;
        const res = await axios.post('/api/login', formData , {
            headers: {'Content-Type': 'multipart/form-data; '},
        });

        let userExist = res.data.userExist;
        let passwordCorrect = res.data.passwordCorrect;
        if (userExist == "true" && passwordCorrect == "true"){
            output = 1;
        }
        else if (userExist == "true") {
            output = 2;
        }
        else if (userExist !== "true") {
            output = 3;
        }
        
        return output;
    }

    const checkUser = async (e) => {
        const username = document.getElementById("username-field");
        const password = document.getElementById("password-field");
        const loginErrorMsg = document.getElementById("login-error-msg");

        let result = await validateUser(username.value, password.value);

        if (result === 1) {
            loginErrorMsg.style.opacity = 0;
            setData(username);
            alert("Welcome!");
            setLogin(true);
            setUser(username.value);
        }
        else if (result === 2) {
            loginErrorMsg.style.opacity = 1;
            loginErrorMsg.innerHTML = "password incorrect";
        }
        else if (result === 3) {
            loginErrorMsg.style.opacity = 1;
            loginErrorMsg.innerHTML = "invalid user";
        }
    }

    const handleEnter = (e) => {
        if(e.key === "Enter") checkUser();
    }

    return (
        <div className = "wrap">
            <main id="main-holder">
            <h1 id="login-header">Login Page</h1>
            
            <div id="login-error-msg-holder">
                <p id="login-error-msg">Invalid username</p>
            </div>
            
            <div id="login-form">
                <input type="text" name="username" id="username-field" className="login-form-field" placeholder="Username" onKeyDown={handleEnter}/>
                <input type="password" name="password" id="password-field" className="login-form-field" placeholder="Password" onKeyDown={handleEnter}/>
                <button type="button" value="Login" id="login-form-submit" onClick={checkUser}>Login</button>
            </div>
            </main>
        </div>
    )
}