import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import axios from 'axios'
import Logo from '../images/logoNoBackground.png'
import '../css/login.css'
import { login } from './loginAnimation';

function ForgotPassword()
{
    const doForgotPassword = async event =>{
        event.preventDefault();

        var bp = require('./Path.js');
        var storage = require('../tokenStorage.js');


        const newUser = { /* Gathers User input to Register */
        email: document.getElementById("forgotPasswordEmail").value,
        }

        let isEmptyField = false;
        
        if(newUser.email == ''){
            document.getElementById("forgotPasswordEmail").placeholder='Please enter an email!';
            document.getElementById('forgotPasswordEmail').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('forgotPasswordEmail').style.borderColor = "green";
        }

        if(isEmptyField){
            return;
        }
        let js = JSON.stringify(newUser);
        console.log("This is JSON: " + js);

        let config =
        {
            method: 'post',
            url: bp.buildPath('api/forgotPassword'),
            headers:
            {
            'Content-Type': 'application/json'
            
            },
            data: js
        };
        console.log(config);
        axios(config)
        .then(function (response)
        {
            var res = response.data;
            console.log("Response is: " , response);

            if (res.error != 'success')
            {
                //setMessage('Failed to register. Please try again.');
                console.log("Failed to send email.")
            }
            else
            {
                storage.storeToken(res);
                /*var jwt = require('jsonwebtoken');
                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var userId = ud.payload.userId;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;
                var user = {firstName:firstName,lastName:lastName,id:userId}
                localStorage.setItem('user_data', JSON.stringify(user));
                */
                console.log("User successfully sent an email.");
                window.location.href = '/login';
            }
        })

        .catch(function (error)
        {
            console.log(error);
        });
    }


return(
    <div class="register-app">
        <div class='form-main-register'>
            <div id="logo-Words">
                <img src={Logo} alt="Paradise Logo" id="paradiseLogo" />
                <h1 id="paradiseText">Paradise Kitchen</h1>
            </div>
            <div id="form-container" class="form-container">
                <span class="text" id="signUpResult"></span>
                <div id="register" class="input-group register-input" action="">
                    
                    <div class='input-item'>
                        <label for="Email"><strong>Input Email to Recover Password</strong></label>
                        <input type="text" name="email" id="forgotPasswordEmail" placeholder="johndoe@gmail.com"/>
                    </div>
                </div>
                <div id="registerButtonBox">
                        <input type="submit" value="Send Email" onClick={doForgotPassword} />
                </div>
            </div>
        </div>

    </div>

);

}



export default ForgotPassword;