import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import axios from 'axios'
import Logo from '../images/logoNoBackground.png'
import '../css/login.css'


function Login()
{
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');
    const doLogin = async event =>
    {
        event.preventDefault();
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
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
            if (res.error)
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');
                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var userId = ud.payload.userId;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;
                var user = {firstName:firstName,lastName:lastName,id:userId}
                localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/cards';
            }
        })

        .catch(function (error)
        {
            console.log(error);
        });
    }
    
    return(

        <div class="app">
        <header>
            <img src={Logo} alt="Paradise Logo" id="paradiseLogo" />
            <a href="https://github.com/kmartorell/paradise-kitchen" id="paradiseText">Paradise Kitchen</a>
        </header>
        <div id="form-container" class="form-container">
            <div class="button-box">
                <div id="btn"></div>
                <button type="button" id="toggle-login" class="toggle-btn" onclick="login"><strong>Sign In</strong></button>
                <button type="button" id="toggle-register" class="toggle-btn" onclick="register"><strong>Sign Up</strong></button>
            </div>

            <div id="login" class="input-group" action="">
                <span class="text" id="loginResult" >{message}</span>
                <label for="Username"><strong>Username</strong></label>
                <input type="text" name="username" id="loginName" placeholder="Username" ref={(c) => loginName = c} />
                <label for="Password"><strong>Password</strong></label>
                <input type="password" name="password" id="loginPassword" placeholder="Password" ref={(c) =>
                loginPassword = c} />

                <input type="button" value="Login" onClick={doLogin} />
            </div>

            <div id="register" class="input-group" action="">
                <span class="text" id="signUpResult"></span>
                <label for="First Name">First Name</label>
                <input type="text" name="nameFirst" id="registerNameFirst" placeholder="First Name" />

                <label for="Last Name">Last Name</label>
                <input type="text" name="nameLast" id="registerNameLast" placeholder="Last Name" />

                <label for="Username">Username</label>
                <input type="text" name="username" id="registerUsername" onclick="showLoginReq()" placeholder="Username" />

                <label for="Password">Password</label>
                <input type="password" name="password" id="registerPassword" onclick="showPasswordReq()" placeholder="Password" />

                <div id="registerButtonBox">
                    <input type="button" value="Register" onclick="doRegister()" />
                </div>
                <div id="req"></div>

            </div>
        </div>
        </div>
    );
};

export default Login;