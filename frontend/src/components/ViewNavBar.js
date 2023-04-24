import React from "react"
import Logo from '../images/logoNoBackground.png'
import '../css/NavBar.css'

function GoBack(){
    window.location.href = 'javascript:history.back()';
}

function NavBar() {

  const doLogout = event => 
  {
  event.preventDefault();
      localStorage.removeItem("user_data");
      window.location.href = '/';
  };    

  return (

    <nav className="navigation">
      <img src={Logo} alt="Paradise Logo" id="ParadiseLogo" />
      <a className="brand-name" id="ParadiseKitchenWords"> Paradise Kitchen</a>
      <div
        className="navigation-menu">
        <ul>
          <li>
          <button type="button" id="ReturnButton" class="buttons" onClick={GoBack}> Return</button>
          </li>
          <li>
            <button type="button" id="logoutButton" class="buttons" onClick={doLogout}> Log Out </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
