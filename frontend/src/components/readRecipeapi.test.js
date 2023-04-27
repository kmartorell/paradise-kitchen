import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
//const axios = require('axios');
import axios from 'axios'
import expect from 'expect'

test('POST /api/readRecipe works correctly', async () => {
  const dataToPost = {
    id: "6449c067eb6a53a5abebb862" 
  };

  var js = JSON.stringify(dataToPost);
  var bp = require('./Path.js');

  var config =
        {
            method: 'post',
            url: bp.buildPath('api/readrecipe'),
            headers:
            {
            'Content-Type': 'application/json'
            },
            data: js
        };
        const response = await axios(config);
        expect(response.status).toBe(200);
});