import React from "react";
import './WelcomeScreen.css';
import logo from './MEETthin.png';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
  (
  <div className="WelcomeScreen">
    <div className="WelcomeBox">
      <h1>Welcome to</h1>
      <img width="200px" height="90px" src={logo} alt="Logo" className="logo" />
      <h4>Log in to see upcoming<br/>events around the world<br/>for full-stack developers</h4>
      <div className="button_cont" align="center">
        <div class="google-btn">
          <div class="google-icon-wrapper">
            <img class="google-icon" 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
            alt="Google sign-in" />
          </div>
          <button onClick={() => { props.getAccessToken() }} 
            rel="nofollow noopener" 
            class="btn-text" >
            <b>Sign in with google</b>                
          </button>
        </div>
      </div>
      <p>This site is used specifically for education purposes and has no commercial intent or use. No personal data is collected, saved, or shared at any stage. The calendar accessed is not a personal calendar, but one created specifically for the project to provide sample content to the user. This app complies with the Google API Services User Data Policy, including the Limited Use requirements.</p>
      <a href="https://shplank.github.io/meet/privacy.html" alt="privacy policy"
        rel="nofollow noopener" >
        Privacy Policy/Limited Use Disclosure
      </a>
    </div>
  </div>
  )
  : null
}

export default WelcomeScreen;
