import React from 'react';
import { Link } from 'react-router-dom';
import { currentDataset } from "../../reducers/selectors";
import GraphFormContainer from "../graph/graph_form_container";
import ReactDOM from 'react-dom';
import RenderHelper from './render_helper';
import Papa from 'papaparse';
import NavBar from "../greeting/greeting_container";
import { buildDataForOutput } from '../../util/other/data_parser';
import GraphIndexItem from "../graph/graph_index_item";

class DatasetShow extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.requestSingleDataset(this.props.match.params.datafile_id);
    this.props.requestAllGraphs();
  }

  setToRaw(){
    this.props.localUpdateGraph({
      title: "Raw data",
      graph_type: "raw",
      datafile_id: this.props.dataset.id,
      user_id: null
    });
  }

  setGraph(id){
    let graph;
    for (var i = 0; i < this.props.graphs.length; i++) {
      if(this.props.graphs[i].id===id){
        this.props.localUpdateGraph(this.props.graphs[i]);
      }
    }
  }

  render(){
    let listItems;
    const destroyGraph=(graph)=>{
      return ()=>{this.props.destroySingleGraph(graph);};
    };
    const selectGraph=(graph)=>{
      return ()=>{this.setGraph(graph.id);};
    };
    if(this.props.graphs&&this.props.graphs.length>0)
    {
      let odd=true;
      listItems = this.props.graphs.map(graph => {
        if(graph.datafile_id===this.props.dataset.id){
            if(odd){odd=false;}else{odd=true;}
            return (<GraphIndexItem
            odd={odd}
            title={graph.title}
            key={graph.id}
            id={graph.id}
            destroyGraph={destroyGraph(graph)}
            setGraph={selectGraph(graph).bind(this)}
            />);
          }else{
            return null;
          }
        }
      );
    }
    let useData=this.props.parsedData ? this.props.parsedData.data : null;
    if(useData) {useData=buildDataForOutput(useData);}
    if(this.props.dataset){
      return(
        <div className="parent">
          <NavBar history={this.props.history}/>
        <div className="data-show">
          <div className="show-content">
            <ul className="graph-index">
              <h1>Saved Analyses</h1>
              {listItems}
            </ul>
            <div className="data-render">
              <h3>Dataset Title: {this.props.dataset.title}</h3>
              {RenderHelper(this.props.selectedGraph,useData)}
            </div>
          </div>
          <GraphFormContainer/>
        </div>
        </div>
      );
    }else{
      return null;
    }
  }
}

export default DatasetShow;

//<li className="odd-li" onClick={this.setToRaw.bind(this)}>Raw data</li>
