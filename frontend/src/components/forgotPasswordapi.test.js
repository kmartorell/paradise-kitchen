import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
//const axios = require('axios');
import axios from 'axios'
import expect from 'expect'

test('POST /api/forgotPassword works correctly', async () => {
  const dataToPost = {
    email: "dylanengle7@gmail.com",
    login:"testing6",
  };

  var js = JSON.stringify(dataToPost);
  var bp = require('./Path.js');

  var config =
        {
            method: 'post',
            url: bp.buildPath('api/forgotPassword'),
            headers:
            {
            'Content-Type': 'application/json'
            },
            data: js
        };
        const response = await axios(config);
        expect(response.status).toBe(200);
});