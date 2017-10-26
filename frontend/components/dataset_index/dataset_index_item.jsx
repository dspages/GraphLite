import React from 'react';
import merge from 'lodash/merge';
import { Link } from 'react-router-dom';

class DatasetIndexItem extends React.Component{
  constructor(props) {
    super(props);
  }

  relink(){
    // this.props.history.push(`/datasets/${this.props.id}`);
  }

   render(){
     let classname="even-li";
     if(this.props.odd){classname="odd-li";}
    //  console.log(this.props);
     return(
       <li onClick={this.relink.bind(this)} className="data-index-item" className={classname}>
          <Link className="item-part" to={`/datasets/${this.props.id}`}>
           {this.props.title}
         </Link>
        <button className="item-part" onClick={this.props.destroyData}> Delete </button>
       </li>
     );
   }
}

export default DatasetIndexItem;
