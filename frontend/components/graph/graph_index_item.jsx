import React from 'react';
import merge from 'lodash/merge';
import { Link } from 'react-router-dom';

class GraphIndexItem extends React.Component{
  constructor(props) {
    super(props);
  }

   render(){
     let classname="even-li";
     if(this.props.odd){classname="odd-li";}
    //  console.log(this.props);
     return(
       <li className={classname}>
          <button className="item-part" onClick={this.props.setGraph}> {this.props.title}
            </button>
          <button className="item-part" onClick={this.props.destroyGraph}> Delete
        </button>
       </li>
     );
   }
}

export default GraphIndexItem;
