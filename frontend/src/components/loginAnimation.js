import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import axios from 'axios'



function register() {
    let x = document.querySelector("#login");
    let y = document.querySelector("#register");
    let z = document.querySelector("#btn");
    let form = document.querySelector("#form-container");
    let log = document.querySelector("#toggle-login");
    let reg = document.querySelector("#toggle-register");
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
    form.style.height = "1000px";
    reg.style.color = "white";
    log.style.color = "black";
}

function login() {
    let x = document.querySelector("#login");
    let y = document.querySelector("#register");
    let z = document.querySelector("#btn");
    let form = document.querySelector("#form-container");
    let log = document.querySelector("#toggle-login");
    let reg = document.querySelector("#toggle-register");
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
    form.style.height = "520px"
    reg.style.color = "black";
    log.style.color = "white";
}

export {login, register};