import React from 'react';
import '../css/Profile.css'

function PageTitle()
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userID = ud.id;
    var email = ud.email;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

   return(
        <center className='HomePageBox'>
                <h1 id="HomePageWords">
                    {firstName} {lastName}
                </h1>
                <br></br>
                <h3>Email: {email}</h3>

        </center>
   );
};
export default PageTitle;
