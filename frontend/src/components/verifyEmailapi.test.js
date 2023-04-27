import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
//const axios = require('axios');
import axios from 'axios'
import expect from 'expect'

test('POST /api/verifyEmail works correctly', async () => {
  const dataToPost = {
    email: "dylanengle7@gmail.com",
    emailCode:"123456",
  };

  var js = JSON.stringify(dataToPost);
  var bp = require('./Path.js');

  var config =
        {
            method: 'post',
            url: bp.buildPath('api/verifyEmail'),
            headers:
            {
            'Content-Type': 'application/json'
            },
            data: js
        };
        const response = await axios(config);
        expect(response.status).toBe(200);
});