import React from 'react';
import { Link } from 'react-router-dom';
import { currentDataset } from "../../reducers/selectors";
import Papa from "papaparse";
import { getHeaders } from "../../util/other/data_parser";

const getProps=function(type){
  switch(type){
   case "raw": return [];
   case "multi": return ["labels","y_data","y_data2","y_data3","sort_by", "scaled"];
   case "radar": return ["labels","y_data","y_data2","y_data3","sort_by", "scaled"];
   case "line": return ["labels","y_data","y_data2","y_data3","sort_by", "scaled"];
   case "bar": return ["labels","y_data","y_data2","y_data3","sort_by", "scaled"];
   case "area": return ["labels","y_data","y_data2","y_data3","sort_by", "scaled"];
   case "radial": return ["y_data","y_data2","y_data3","sort_by", "scaled"];
   case "pie": return ["labels","y_data","sort_by"];
   case "scatter": return ["labels","x_data","y_data","y_data2", "scaled"];
   case "tree": return ["y_data"];
   case "voronoi": return ["x_data","y_data"];
   default: return [];
  }
};

const used=function(type, prop){
  if(!type){return false;}
  return getProps(type).includes(prop);
};

class NewGraphForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {title: "", graph_type: "multi"};
  }

  componentWillMount(){
    this.props.localUpdate({x_data: null, y_data: null, y_data2: null,
    y_data3: null, sort_by: null, labels: null, title: null, filter: null,
    scaled: null});
  }

  componentDidMount(){
    this.props.localUpdate({graph_type: "multi"});

    if(window.opr){//BEGIN SPECIAL CASE FOR OPERA BROWSER

      //This is a workaround for a strange bug where recharts and Opera
      //don't work together properly

      let interval=setInterval(()=>{this.props.localUpdate(
          {title: this.props.selectedGraph.title}
        );
      },1500);
      this.setState({opInterval: interval});
    }//END SPECIAL CASE FOR OPERA BROWSER
  }

  componentWillUnMount(){
    if(window.opr){clearInterval(this.state.opInterval);}
  }

  clickType(event){
    this.props.localUpdate({graph_type: event.target.value});
  }

  clickX(event){
    this.props.localUpdate({x_data: event.target.value});
  }

  clickY(event){
    this.props.localUpdate({y_data: event.target.value});
  }

  clickY2(event){
    this.props.localUpdate({y_data2: event.target.value});
  }

  clickY3(event){
    this.props.localUpdate({y_data3: event.target.value});
  }

  clickLabels(event){
    this.props.localUpdate({labels: event.target.value});
  }

  changeTitle(event){
    this.props.localUpdate({title: event.target.value});
  }

  clickSort(event){
    this.props.localUpdate({sort_by: event.target.value});
  }

  toggleSort(event){
    if(this.props.selectedGraph.sort_reverse){
      this.props.localUpdate({sort_reverse: false});
    }else{this.props.localUpdate({sort_reverse: true});}
  }

  setScale(event){
    this.props.localUpdate({scaled: event.target.value});
  }

  updateData(){
    this.props.requestUploadGraph({
      x_data: this.props.selectedGraph.x_data,
      y_data: this.props.selectedGraph.y_data,
      y_data2: this.props.selectedGraph.y_data2,
      y_data3: this.props.selectedGraph.y_data3,
      sort_by: this.props.selectedGraph.sort_by,
      filter: this.props.selectedGraph.filter,
      scaled: this.props.selectedGraph.scaled,
      sort_reverse: this.props.selectedGraph.sort_reverse,
      labels: this.props.selectedGraph.labels,
      title: this.props.selectedGraph.title,
      graph_type: this.props.selectedGraph.graph_type,
      datafile_id: this.props.dataset.id,
      user_id: this.props.user.id
    });
  }

  render(){
    let opts=null;
    let numOpts=null;
    if(this.props.parsedDataset){
      opts=getHeaders(this.props.parsedDataset.data);
      numOpts=getHeaders(this.props.parsedDataset.data,null,true);
      numOpts.push(null);
      opts.push(null);
      opts=opts.map((opt, idx) =>
        <option key={idx} value={opt}>{opt ? opt : "*Hide*"}</option>
      );
      numOpts=numOpts.map((numOpt, idx) =>
        <option key={idx} value={numOpt}>{numOpt ? numOpt : "*Hide*"}</option>
      );
    }
    let type=this.props.selectedGraph.graph_type;
    return(
      <form className="bottom-bar">
          <div className="tooltip">
            <input type="submit" onClick={this.updateData.bind(this)} value="Save"/>
            <div className="tooltip-wrapper">
              <span className="tooltiptext">Save the analysis parameters to view them later</span>
            </div>
          </div>
          <div className="graph-form">
            <label className="tooltip">Title
              <input value={this.props.selectedGraph.title} onChange={this.changeTitle.bind(this)} type="text"/>
              <div className="tooltip-wrapper">
                <span className="tooltiptext">Choose a title for your chart before you save it!</span>
              </div>
            </label>
            <div className="drop-down-group">
            <label className="tooltip">Graph
              <select value={this.props.selectedGraph.graph_type} onChange={this.clickType.bind(this)}>
                <option value="multi">Multi</option>
                <option value="line">Line</option>
                <option value="radar">Radar</option>
                <option value="bar">Bar</option>
                <option value="area">Area</option>
                <option value="scatter">Scatter</option>
                <option value="pie">Pie</option>
                <option value="radial">Radial</option>
                <option value="tree">Tree</option>
                <option value="voronoi">Voronoi</option>
              </select>
              <div className="tooltip-wrapper">
                <span className="tooltiptext">Choose a type of graph</span>
              </div>
            </label>
            {used(type,"scaled") ? (<label className="tooltip">Scale
               <select value={this.props.selectedGraph.scaled} onChange={this.setScale.bind(this)}>
                 <option value="default">Default</option>
                 <option value="log">Log</option>
                 <option value="norm">Norm</option>
                 <option value="range">Range</option>
                 <option value="sci">Sci</option>
               </select>
               <div className="tooltip-wrapper">
                 <span className="tooltiptext">Apply a custom scale - log(10), normalize the data to a common scale, express the data as a fraction of its range, or apply scientific notation</span>
               </div>
              </label>) : null}
            </div>
            <div className="drop-down-group">
            {used(type,"x_data") ? (
            <label className="tooltip">X axis
              <select value={this.props.selectedGraph.x_data} onChange={this.clickX.bind(this) }>
                {numOpts}
              </select>
              <div className="tooltip-wrapper">
                <span className="tooltiptext">Choose a source for the X axis (numeric only)</span>
              </div>
            </label>) : null}
            {used(type,"labels") ? (
            <label className="tooltip">Labels
              <select value={this.props.selectedGraph.labels} onChange={this.clickLabels.bind(this) }>
                {opts}
              </select>
              <div className="tooltip-wrapper">
                <span className="tooltiptext">Choose a source for labels, or hide labels</span>
              </div>
            </label>) : null}
            {used(type,"sort_by") ? (
            <div className="sorting"><label className="tooltip">Sort By
              <select value={this.props.selectedGraph.sort_by} onChange={this.clickSort.bind(this) }>
                {opts}
              </select>
              <div className="tooltip-wrapper">
                <span className="tooltiptext">Order the data by a variable</span>
              </div>
            </label>
            <label className="tooltip">Descending?
               <input checked={this.props.selectedGraph.sort_reverse} onChange={this.toggleSort.bind(this)} type="checkbox" name="toggle_sort"/>
                 <div className="tooltip-wrapper">
                   <span className="tooltiptext">Toggle the direction of sort (works with sort by)</span>
                 </div>
             </label>
             </div>
            ) : null}
            </div>
            <div className="drop-down-group">
            {used(type,"y_data") ? (
            <label className="tooltip">Data 1
              <select value={this.props.selectedGraph.y_data} onChange={this.clickY.bind(this)}>
                {numOpts}
              </select>
              <div className="tooltip-wrapper">
                <span className="tooltiptext">Choose data to display</span>
              </div>
            </label>) : null}
            {used(type,"y_data2") ? (
            <label className="tooltip">Data 2
              <select value={this.props.selectedGraph.y_data2} onChange={this.clickY2.bind(this)}>
                {numOpts}
              </select>
              <div className="tooltip-wrapper">
                <span className="tooltiptext">Choose secondary data to display, or hide</span>
              </div>
            </label>
          ) : null}
            {used(type,"y_data3") ? (
            <label className="tooltip">Data 3
              <select value={this.props.selectedGraph.y_data3} onChange={this.clickY3.bind(this)}>
                {numOpts}
              </select>
              <div className="tooltip-wrapper">
                <span className="tooltiptext">Choose tertiary data to display, or hide</span>
              </div>
            </label>
            ) : null}
            </div>
          </div>
      </form>
    );
  }
}

export default NewGraphForm;
