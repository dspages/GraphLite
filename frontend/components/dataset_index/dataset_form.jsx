import React from 'react';
import NavBar from "../greeting/greeting_container";
import Dropzone from 'react-dropzone';
import { buildDataForOutput } from "../../util/other/data_parser";
import Papa from "papaparse";

class DatasetForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {title: "", privacy: false, file: [{name: "no file", size: "0"}] };
  }

  onDrop(files) {
    let file=files[0];
    this.state.file=file;
    let reader = new FileReader();
    reader.onloadend=()=>{
      let result=reader.result;
      let data=[];
      let delim=null;
      let type = file.name.split('.').pop();
      type=type.toLowerCase();
      if(type=="json"){
        data = JSON.parse(result);
      }
      if(type=="csv"){delim=",";}
      if(type=="tsv"){delim="\t";}
      if(delim){data=buildDataForOutput(result,delim);}
      this.setState({data: data});
    };
    reader.readAsText(file);
  }

  submitForm (event) {
    let parsed=Papa.unparse(this.state.data);
    event.preventDefault();
    this.props.requestUpload({
      data: parsed,
      title: this.state.title,
      privacy: this.state.privacy,
      user_id: this.props.user.id}).then(this.props.history.push('/'));
  }

  changeTitle (event) {
    this.setState({title: event.target.value});
  }

  makePrivate(event) {
    if(this.state.privacy){
      this.setState({privacy: false});
    }else{
      this.setState({privacy: true});
    }
  }

  render(){
    return (
      <div className="parent">
        <NavBar history={this.props.history}/>
          <form className="form-style-7">
            <ul>
            <li>
               <input onChange={this.changeTitle.bind(this)} type="text" name="Title"/>
               <span>Enter a title for the dataset</span>
            </li>
            <li id = "row-box">
               <input onChange={this.makePrivate.bind(this)} className="auth-item" type="checkbox" name="privacy_setting"/>
               <span> Set dataset to private</span>
            </li>
            <li>
              <section>
                <div className="dropzone">
                  <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone">
                    <p>Drop a file here, or click to select a file to upload.</p>
                  </Dropzone>
                </div>
                <aside>
                  <ul>
                    {
                      [this.state.file].map(f => <li key="1">{f.name} - {f.size} bytes</li>)
                    }
                  </ul>
                </aside>
              </section>
              <p>Types: .json, .csv, .tsv </p>
            </li>
            <li>
                <input onClick={this.submitForm.bind(this)} type="submit" value="Upload!" />
            </li>
            </ul>
           </form>
         <img className="background-image" src="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"></img>
       </div>
    );
  }

}


export default DatasetForm;
