import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import axios from 'axios'
import Logo from '../images/logoNoBackground.png'
import '../css/login.css'
import { login } from './loginAnimation';
import { register } from './loginAnimation';

function Register()
{
    console.log("In Register");

        console.log("made it in doRegister");

        var bp = require('./Path.js');
        var storage = require('../tokenStorage.js');


        const newUser = { /* Gathers User input to Register */
        firstName: document.getElementById("registerNameFirst").value,  
        lastName: document.getElementById("registerNameLast").value,
        email: document.getElementById("registerEmail").value,
        login: document.getElementById("registerUsername").value,
        password: document.getElementById("registerPassword").value,
        }

        let isEmptyField = false;
        if(newUser.firstName == ''){
            document.getElementById('registerNameFirst').placeholder = "Please enter a first name!";
            document.getElementById('registerNameFirst').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerNameFirst').style.borderColor = "green";
        }
    
        if(newUser.lastName == ''){
            document.getElementById("registerNameLast").placeholder='Please enter a last name!';
            document.getElementById('registerNameLast').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerNameLast').style.borderColor = "green";
        }
        
        if(newUser.email == ''){
            document.getElementById("registerEmail").placeholder='Please enter an email!';
            document.getElementById('registerEmail').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerEmail').style.borderColor = "green";
        }
    
        if(newUser.login == ''){
            document.getElementById("registerUsername").placeholder='Please enter a username!';
            document.getElementById('registerUsername').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerUsername').style.borderColor = "green";
        }
    
        if(newUser.password == ''){
            document.getElementById("registerPassword").placeholder='Please enter a password!';
            document.getElementById('registerPassword').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerPassword').style.borderColor = "green";
        }

        if(isEmptyField){
            return;
        }
        let js = JSON.stringify(newUser);
        console.log("This is JSON: " + js);

        let config =
        {
            method: 'post',
            url: bp.buildPath('api/register'),
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
                console.log("Failed to register.")
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
                console.log("User successfully registered.");
            }
        })

        .catch(function (error)
        {
            console.log(error);
        });
    
}

export default Register;
