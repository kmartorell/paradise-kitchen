import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import axios from 'axios'
import Logo from '../images/logoNoBackground.png'
import '../css/login.css'
import { login } from './loginAnimation';
import { register } from './loginAnimation';
import Register from './Register_old';
import forgotPassword from './ForgotPassword';

function Login()
{
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');
    const doLogin = async event =>
    {

        console.log("In DO login");

        const user = { /* Gathers User input to Register */
        login: document.getElementById("loginName").value,  
        password: document.getElementById("loginPassword").value,
        }

        let isEmptyField = false;
        if(user.login == ''){
            document.getElementById('loginName').placeholder = "Please enter a username!";
            document.getElementById('loginName').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('loginName').style.borderColor = "green";
        }

        if(user.password == ''){
            document.getElementById("loginPassword").placeholder='Please enter a password!';
            document.getElementById('loginPassword').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('loginPassword').style.borderColor = "green";
        }
        if(isEmptyField){
            return;
        }


        event.preventDefault();
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        console.log("This is JSON: " + js);
        var config =
        {
            method: 'post',
            url: bp.buildPath('api/login'),
            headers:
            {
            'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config)
        .then(function (response)
        {
            var res = response.data;
            console.log("Response is: " , response);
    
            if (res.status == 500)
            {
                setMessage('User/Password combination incorrect');
            }
            else if(res.id == -1){
                console.log("Here");
                setMessage('User/Password combination incorrect');
            }
            else
            {
                console.log("Worked");
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');
                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var user = {};
                if(ud){
                    var userId = ud.payload.userId;
                    var firstName = ud.payload.firstName;
                    var lastName = ud.payload.lastName;
                    user = {firstName:firstName,lastName:lastName,id:userId}
                }else{
                    user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                }
                
                localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/cards';
            }
        }).catch(function (error)
        {
            console.log(error);
        });
    }
    

    return(

    <div class="login-app">
        <div class='form-main-login'>
            <div id="logo-Words">
                <img src={Logo} alt="Paradise Logo" id="paradiseLogo" />
                <h1 id="paradiseText">Paradise Kitchen</h1>
            </div>
            <div id="form-container" class="form-container">
                <div class="button-box">
                    <div id="btn-login"></div>
                    <a href='/login'><button type="button" id="toggle-selected" class="toggle-btn"><strong>Sign In</strong></button></a>
                    <a href='/register'><button type="button" id="toggle-unselected" class="toggle-btn"><strong>Sign Up</strong></button></a>
                </div>
                <span class="text" id="loginResult">{message}</span>
                <div id="login" class="input-group login-input" action="">
                    <div class='input-item'>
                        <label for="Username"><strong>Username</strong></label>
                        <input type="text" name="username" id="loginName" placeholder="Username" ref={(c) => loginName = c} />
                    </div>
                    
                    <div class='input-item'>
                        <label for="Password"><strong>Password</strong></label>
                        <input type="password" name="password" id="loginPassword" placeholder="Password" ref={(c) =>
                        loginPassword = c} />
                    </div>
                </div>
                <div id="forgotPassword">
                    <button id="forgotPasswordButton" onClick={forgotPassword}>Forgot Password?</button>
                </div>
                <div id="loginButtonBox">
                        <input type="submit" value="Login" onClick={doLogin} />
                </div>
            </div>
        </div>

    </div>
    
    );
};

export default Login;
