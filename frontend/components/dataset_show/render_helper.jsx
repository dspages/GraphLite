import { logScale, normScale, sciScale, rangeScale } from '../../util/other/scale_util';

import{
  VictoryLine, polar, VictoryBar, VictoryChart, VictoryTheme,
  VictoryArea, VictoryScatter,
  VictoryVoronoi, VictoryPie
} from 'victory';

import {Legend, Scatter, ScatterChart, LineChart, Line, XAxis, YAxis, ZAxis,
   CartesianGrid, Tooltip, BarChart, Bar, AreaChart, Area, ComposedChart,
 Treemap, PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis,
RadialBarChart, RadialBar, ResponsiveContainer, Custom} from 'recharts';

import React from 'react';
import ReactDOM from 'react-dom';
import Papa from 'papaparse';

const anim={
    duration: 2000,
    onLoad: { duration: 1000 }
  };

const customLabel=function({index},data,label){
  return(<text>{data[index].label}</text>);
};

//Recharts ResponsiveContainer doesn't seem to work in Safari, so we need this
//exception for ResponsiveContainer so the rendering works in Safari
const safariException=function(element){
  if(window.safari){
    return element;
  }
  return(
    <ResponsiveContainer>
      {element}
    </ResponsiveContainer>
  );
};

function RenderHelper(selectedGraph,data){
  if (data===null){
    return null;
  }
  if(!selectedGraph){
    return null;
  }
  let width=600;
  let height=400;
  let mySort=(a, b)=> {
    let item1=a[selectedGraph.sort_by];
    let item2=b[selectedGraph.sort_by];
    if (item2 > item1) {return selectedGraph.sort_reverse ? 1 : -1;}
    if (item2 < item1) {return selectedGraph.sort_reverse ? -1 : 1;}
    return 0;
  };
  data=data.sort(mySort);
  let scaleFunc;
  switch(selectedGraph.scaled){
    case "log": scaleFunc=logScale; break;
    case "norm": scaleFunc=normScale; break;
    case "sci": scaleFunc=sciScale; break;
    case "range": scaleFunc=rangeScale; break;
    default: scaleFunc = (input) => {return input;};
  }
  let muted=[];
  if(selectedGraph.y_data) {
    data=scaleFunc(data,selectedGraph.y_data);
    muted.push(selectedGraph.y_data);
  }
  if(selectedGraph.x_data&&!muted.includes(selectedGraph.x_data)) {
    data=scaleFunc(data,selectedGraph.x_data);
    muted.push(selectedGraph.x_data);
  }
  if(selectedGraph.y_data2&&!muted.includes(selectedGraph.y_data2)) {
    data=scaleFunc(data,selectedGraph.y_data2);
    muted.push(selectedGraph.y_data2);
  }
  if(selectedGraph.y_data3&&!muted.includes(selectedGraph.y_data3)) {
    data=scaleFunc(data,selectedGraph.y_data3);
  }

  if(selectedGraph.graph_type==="scatter"&&selectedGraph.y_data!=="*Hide*"){
    return (
      <VictoryChart height={height} width={width} theme={VictoryTheme.material}>
        <VictoryScatter animate={anim}
          size={10}
          style={{ data: { fill: "#c43a31" } }}
          labels={(datum) => `${datum[selectedGraph.labels] || ""}`}
          data={data} y={selectedGraph.y_data} x={selectedGraph.x_data}
          bubbleProperty={selectedGraph.y_data2}
        />
      </VictoryChart>
    );
  }
    // if(selectedGraph.graph_type==="scatter"){
    //   return (
    //     <ScatterChart width={width} height={height}>
    //       <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    //         <XAxis />
    //         <YAxis />
    //         <Custom dataKey={selectedGraph.labels}/>
    //         <Tooltip />
    //         <Scatter data={data} dataKey={selectedGraph.x_data} dataKey={selectedGraph.y_data} fill="#8884d8" />
    //     </ScatterChart>
    //   );
    // }
    if(selectedGraph.graph_type==="pie"){
      return (

          <VictoryPie data={data} y={selectedGraph.y_data} x={selectedGraph.labels}/>

      );
    }
    if(selectedGraph.graph_type==="voronoi"){
      if((selectedGraph.x_data!=="*Hide*"&&selectedGraph.y_data!=="*Hide*")&&(selectedGraph.x_data!==selectedGraph.y_data))
      {return (
        <VictoryChart theme={VictoryTheme.material} animate={anim}>
          <VictoryVoronoi style={{ data: { stroke: "#c43a31", strokeWidth: 2 } }}
            data={data} y={selectedGraph.y_data} x={selectedGraph.x_data}
            />
        </VictoryChart>
      );}
      return null;
    }
    if(selectedGraph.graph_type==="line"){
      return (safariException(
      <ComposedChart data={data} width={width} height={height} >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <YAxis  />
        <XAxis dataKey={selectedGraph.labels} />
        <Line type="monotone" dataKey={selectedGraph.y_data} stroke="#8888d8" />
        <Line type="monotone" dataKey={selectedGraph.y_data2} stroke="#88d888" />
        <Line type="monotone" dataKey={selectedGraph.y_data3} stroke="#d88888" />
        <Tooltip />
      </ComposedChart>
    ));
    }
    if(selectedGraph.graph_type==="area"){
      return (safariException(
        <AreaChart data={data} width={width} height={height} >
          <defs>
            <linearGradient id={"color"+selectedGraph.y_data} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id={"color"+selectedGraph.y_data2} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id={"color"+selectedGraph.y_data3} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#dd999d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#dd999d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey={selectedGraph.labels} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey={selectedGraph.y_data} stroke="#8884d8"
            fillOpacity={1} fill={"url(#color"+selectedGraph.y_data+")"} />
          <Area type="monotone" dataKey={selectedGraph.y_data2} stroke="#82ca9d"
            fillOpacity={1} fill={"url(#color"+selectedGraph.y_data2+")"} />
          <Area type="monotone" dataKey={selectedGraph.y_data3} stroke="#dd999d"
              fillOpacity={1} fill={"url(#color"+selectedGraph.y_data3+")"} />
        </AreaChart>
      ));
    }
    if(selectedGraph.graph_type==="radar"){
      let radar0=null;
      let radar1=null;
      let radar2=null;
      if("*Hide*"!==selectedGraph.y_data) {
        radar0=(<Radar dataKey={selectedGraph.y_data} stroke="#8884d8"
        fill="#8884d8" fillOpacity={0.5} />);}
      if("*Hide*"!==selectedGraph.y_data2) {
        radar1=(<Radar dataKey={selectedGraph.y_data2} stroke="#82ca9d"
        fill="#82ca9d" fillOpacity={0.5} />);}
      if("*Hide*"!==selectedGraph.y_data3) {
        radar2=(<Radar dataKey={selectedGraph.y_data3} stroke="#dd779d"
        fill="#dd779d" fillOpacity={0.5} />);}
      return (safariException(
        <RadarChart outerRadius={160} width={width} height={height} data={data}>
          {radar0}
          {radar1}
          {radar2}
          <PolarGrid />
          <Tooltip />
          <Legend />
          <PolarAngleAxis dataKey={selectedGraph.labels} />
        </RadarChart>
      ));
    }
    if(selectedGraph.graph_type==="raw"){
      return (<text>{Papa.unparse(data)}</text>);
    }
    if(selectedGraph.graph_type==="radial")
    {
      let radial0=null;
      let radial1=null;
      let radial2=null;
      if("*Hide*"!=selectedGraph.y_data) {
        radial0=(<RadialBar startAngle={90} endAngle={-270} minAngle={15} fill="#8884d8"
         background clockWise={true} dataKey={selectedGraph.y_data}/>);}
      if("*Hide*"!=selectedGraph.y_data2) {
        radial1=(<RadialBar startAngle={90} endAngle={-270} minAngle={15} fill="#82ca9d"
         background clockWise={true} dataKey={selectedGraph.y_data2} />);}
      if("*Hide*"!=selectedGraph.y_data3) {
        radial2=(<RadialBar startAngle={90} endAngle={-270} minAngle={15} fill="#dd779d"
         background clockWise={true} dataKey={selectedGraph.y_data3} />);}
      return (safariException(
      <RadialBarChart width={width} height={height} innerRadius="10%" outerRadius="80%" data={data}>
        {radial0}
        {radial1}
        {radial2}
        <Tooltip />
      </RadialBarChart>
      ));
    }
    if(selectedGraph.graph_type==="bar"){
      let bar0=null;
      let bar1=null;
      let bar2=null;
      if("*Hide*"!=selectedGraph.y_data) {
        bar0=(<Bar dataKey={selectedGraph.y_data} fill="#8884d8" />);}
      if("*Hide*"!=selectedGraph.y_data2) {
        bar1=(<Bar dataKey={selectedGraph.y_data2} fill="#82ca9d" />);}
      if("*Hide*"!=selectedGraph.y_data3) {
        bar2=(<Bar dataKey={selectedGraph.y_data3} fill="#cca09d" />);}
      return(safariException(
        <BarChart width={width} height={height} data={data}>
        <XAxis dataKey={selectedGraph.labels} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {bar0}
        {bar1}
        {bar2}
      </BarChart>
    ));
    }
      if(selectedGraph.graph_type==="tree"){
        return(safariException(
          <Treemap
            width={width}
            height={height}
            data={data}
            dataKey={selectedGraph.y_data}
            ratio={2 / 1}
            stroke="#fff"
            fill="#8884d8"
          >
          <Tooltip/>
        </Treemap>
        ));
      }
    if (selectedGraph.graph_type==="multi"){
    return (safariException(<ComposedChart width={width} height={height} data={data}>
      <defs>
        <linearGradient id={"color"+selectedGraph.y_data2} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey={selectedGraph.labels} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#f5f5f5" />
      <Bar dataKey={selectedGraph.y_data2}  barSize={20} fill="#413ea0" />
      <Area type="monotone" dataKey={selectedGraph.y_data} fill={"url(#color"+selectedGraph.y_data2+")"} stroke="#88d888" />
      <Line type="monotone" dataKey={selectedGraph.y_data3}  stroke="#ff7300" />
    </ComposedChart>));
}}

export default RenderHelper;
