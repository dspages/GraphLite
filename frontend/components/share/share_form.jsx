import React from 'react';
import NavBar from "../greeting/greeting_container";

class ShareForm extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.requestAllDatasets();
    this.props.requestAllUsers();
  }

  changeDataset(event){
    this.setState({dataset_id: event.target.value});
  }

  changeUser(event){
    this.setState({receiver_id: event.target.value});
  }

  submitForm(){
    this.props.requestCreateShare(this.state).then(()=>{
      this.props.history.push("/");
    });
  }

  render(){
    let users=null;
    if(this.props.users){
      users=this.props.users.map((user, idx) =>
        <option key={idx} value={user.id}>{user.username}</option>
      );
    }
    let datasets=null;
    if(this.props.dataset_index){
      datasets=this.props.dataset_index.map((dataset, idx) =>{
        if(dataset.privacy) return(
        <option key={idx} value={dataset.id}>{dataset.title ? dataset.title : "*Hide*"}</option>);
          return null;
        }
      );
    }
    return (
      <div className="parent">
        <NavBar history={this.props.history}/>
          <form className="form-style-7">
          <ul>
          <li>
             <select onChange={this.changeDataset.bind(this)} type="select">
               <option key={-1} value={-1}></option>
               {datasets}
             </select>
          </li>
          <li>
             <select onChange={this.changeUser.bind(this)} type="select">
               <option key={-1} value={-1}></option>
               {users}
             </select>
          </li>
          <li>
              <input onClick={this.submitForm.bind(this)} type="submit" value="Share!" />
          </li>
          </ul>
         </form>
        <img className="background-image" src="https://images.pexels.com/photos/41290/black-business-computer-computing-41290.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"></img>
      </div>
    );
  }
}

export default ShareForm;
