import React from 'react';
import '../css/Landing.css'

function PageTitle()
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

   return(
        <center className='HomePageBox'>
                <h1 id="HomePageWords">
                    Welcome, {firstName} {lastName}!
                </h1>
                
          </center>
   );
};
export default PageTitle;
