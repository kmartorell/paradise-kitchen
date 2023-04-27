import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
//const axios = require('axios');
import axios from 'axios'
import expect from 'expect'

test('POST /api/searchRecipe works correctly', async () => {
  const dataToPost = {
    text: "Unit" 
  };

  var js = JSON.stringify(dataToPost);
  var bp = require('./Path.js');

  var config =
        {
            method: 'post',
            url: bp.buildPath('api/searchrecipe'),
            headers:
            {
            'Content-Type': 'application/json'
            },
            data: js
        };
        const response = await axios(config);
        expect(response.status).toBe(200);
});