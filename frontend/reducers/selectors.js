import { values, merge } from 'lodash';
import * as Papa from 'papaparse';

export const allDatasets = ({ data }) => {
  return values(data.dataset_index);
};

export const allUsers = ({ users }) => {
  return values(users);
};

export const getGraphs = ({ graph }) => {
  return values(graph.graph_index);
};

export const getGraphsByDataset = ({graph, data}) => {
  let id=data.dataset.id;
  let out=[];
  if (graph.graph_index){
    for (var i = 0; i < graph.graph_index.length; i++) {
      let check=graph.graph_index[i];
      if(check.datafile_id===id){
        out.push(check);
      }
    }
  }
  return out;
};

export const selectedGraph = ({ graph }) => {
  return graph.current_graph;
};

export const selectCurrentUser = ({session}) => {
  return session.user;
};

export const currentDataset = ({data}) =>{
  // console.log(data.dataset);
  return data.dataset;
};

export const parsedDataset = ({data}) => {
  if(data.dataset && data.dataset.data){
    return Papa.parse(data.dataset.data);
  }
};
