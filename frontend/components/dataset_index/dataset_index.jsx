import React from 'react';
import { Link } from 'react-router-dom';
import DatasetIndexItem from './dataset_index_item';
import NavBar from "../greeting/greeting_container";

class DatasetIndex extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.requestAllDatasets();
  }

  newStocks(){
    let id=this.props.user.id;
    this.props.requestGetStocks(id);
  }

  render(){
    const destroyData=(dataset)=>{
      return ()=>{this.props.receiveDestroy(dataset);};
    };
    let listItems;
    if(Object.keys(this.props.dataset_index).length>0)
    {
      let odd=true;
      listItems = this.props.dataset_index.map(dataset => {
        if(odd){odd=false;}else{odd=true;}
        return (
          <DatasetIndexItem
          sharable={dataset.privacy}
          history={this.props.history}
          odd={odd}
          title={dataset.title}
          key={dataset.id}
          id={dataset.id}
          destroyData={destroyData(dataset)}
          />
        );}
      );
    }
    return (
      <div className="parent">
        <NavBar history={this.props.history}/>
        <div className="data-box">
          <img className="background-image"
            src="https://images.pexels.com/photos/520192/pexels-photo-520192.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"></img>
          <h2 className="click-invitation">Your datasets - click to view!</h2>
          {listItems}
          <button onClick={this.newStocks.bind(this)}>
            <text>Auto-create dataset from last 100 days of stocks</text>
          </button>
          <Link className="data-index-item" to={`/datasets/new`}>
            <text>Upload New Dataset</text>
          </Link>
          <Link className="data-index-item" to={`/shares/new`}>
            <text>Share A Private Dataset</text>
          </Link>
        </div>
      </div>
    );
  }

}


export default DatasetIndex;
