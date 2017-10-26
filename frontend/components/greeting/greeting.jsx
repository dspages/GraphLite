import React from 'react';
import { Link } from 'react-router-dom';
import DatasetIndex from '../dataset_index/dataset_index_container';
import SessionFormContainer from '../auth/session_form_container';

class GreetingForm extends React.Component{
  constructor(props){
    super(props);
  }

  home(){
    this.props.history.push("/datasets");
  }

  render(){
     if(this.props.user){
      return (
          <div className="greeting-box">
            <img className="logo" onClick={this.home.bind(this)} src="https://chartio.com/static/app/images/logo.svg" />
            <text>
              Welcome, {this.props.user.username}
            </text>
            <div className="header-button-box">
              <button className="header-button" onClick={this.props.logout}>Log Out</button>
              <button className="header-button"
                onClick={this.home.bind(this)}>Return Home</button>
              </div>
          </div>
      );
    }else{
      return null;
    }
  }
}

export default GreetingForm;
