import React from 'react';
import '../css/Profile.css'
import { userInfo } from 'os';

function PageTitle()
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userID = ud.id;
    var email = ud.email;
    var firstName = ud.firstName;
    var lastName = ud.lastName;
    var login = ud.login;
    

    console.log(ud);

   return(
        <center className='ProfilePageBox'>
                <h1 id="HomePageWords">
                    Welcome to your profile!
                </h1>
                <br/>
                <br/>
                <br/>
                <h3>Name: {firstName} {lastName}</h3>
                <h3>Email: {email}</h3>
                <h3>Username: {login}</h3>

        </center>
   );
};
export default PageTitle;
