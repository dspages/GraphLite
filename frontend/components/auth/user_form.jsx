import React from 'react';
import { Link } from 'react-router-dom';

class UserForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {username: "", password: "", id: ""};
  }

  submitForm (event) {
    event.preventDefault();
    // console.log(this.props.signup);
    this.props.signup({
      username: this.state.username,
      password: this.state.password});
      // .then(this.props.history.push('/'));
  }

  changeUsername (event) {
    this.setState({username: event.target.value});
  }

  changePassword (event) {
    this.setState({password: event.target.value});
  }

  guestLogin (event) {
    event.preventDefault();
    this.props.login({username: "Guest", password: "password"});
  }

  pushButton(event){
    event.preventDefault();
    this.props.history.push(`/session/new`);
  }

  oprWarn(){
    if(window.opr){
      //If user is using Opera or Netscape web browser
      return (<div className="browser-compat">
        <a href="https://www.google.com/chrome/browser/desktop/index.html">
        This site looks best with  <img width="40" height="40" src=
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Chrome.2e16d0ba.fill-600x600.png"
        /></a>
     </div>);
    }
    return null;
  }

  render(){
    return (
      <div className="form-container">
        <nav className="greeting-box">
          <img className="logo" src="https://chartio.com/static/app/images/logo.svg" />
          <h2>Create a new account for GraphLite - a free data visualization app</h2>

          <div className="header-button-box">
            <button onClick={this.pushButton.bind(this)} className="auth-item">Go To Sign In</button>
            <button onClick={this.guestLogin.bind(this)} className="auth-item">Guest Login</button>
          </div>
        </nav>
        <form className="form-style-7">
          {this.props.errors}
          <ul>
          <li>
             <input onChange={this.changeUsername.bind(this)} placeholder=" Username" type="text" name="Username"/>
          </li>
          <li>
             <input onChange={this.changePassword.bind(this)} placeholder=" password" type="password" name="password"/>
          </li>
          <li>
              <input onClick={this.submitForm.bind(this)} type="submit" value="Sign Up" />
          </li>
          </ul>
         </form>
         <img className="background-image" src="https://images.pexels.com/photos/134054/pexels-photo-134054.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"></img>
         {this.oprWarn()}
      </div>
    );
  }

}


export default UserForm;
