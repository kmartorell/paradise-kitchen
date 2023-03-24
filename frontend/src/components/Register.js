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

    const newUser = { /* Gathers User input to Register */
        RFirstName: document.getElementById("registerNameFirst").value,  
        RLastName: document.getElementById("registerNameLast").value,
        REmail: document.getElementById("registerEmail").value,
        RUsername: document.getElementById("registerUsername").value,
        RPassword: document.getElementById("registerPassword").value,
    }

    if(newUser.RFirstName == ''){
        document.getElementById('registerNameFirst').placeholder = "Please enter a first name!";
        document.getElementById('registerNameFirst').style.borderColor = "red";
    }else {
        document.getElementById('registerNameFirst').style.borderColor = "green";
    }

    if(newUser.RLastName == ''){
        document.getElementById("registerNameLast").placeholder='Please enter a last name!';
        document.getElementById('registerNameLast').style.borderColor = "red";
    }else {
        document.getElementById('registerNameLast').style.borderColor = "green";
    }
    
    if(newUser.REmail == ''){
        document.getElementById("registerEmail").placeholder='Please enter an email!';
        document.getElementById('registerEmail').style.borderColor = "red";
    }else {
        document.getElementById('registerEmail').style.borderColor = "green";
    }

    if(newUser.RUsername == ''){
        document.getElementById("registerUsername").placeholder='Please enter a username!';
        document.getElementById('registerUsername').style.borderColor = "red";
    }else {
        document.getElementById('registerUsername').style.borderColor = "green";
    }

    if(newUser.RPassword == ''){
        document.getElementById("registerPassword").placeholder='Please enter a password!';
        document.getElementById('registerPassword').style.borderColor = "red";
    }else {
        document.getElementById('registerPassword').style.borderColor = "green";
    }





    console.log(newUser);


        
        
    
}

export default Register;
