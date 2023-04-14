import React from 'react';
import LandingNavBar from '../components/LandingNavBar.js';
import LandingBody from '../components/LandingBody.js';

const landingPage = () =>
{
    return(
        <div>
            <LandingNavBar />
            <LandingBody />
        </div>
    );
};
export default landingPage;
