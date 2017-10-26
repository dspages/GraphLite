import { merge } from 'lodash';
import { UPLOAD_GRAPH, DESTROY_GRAPH, RECEIVE_GRAPH, RECEIVE_ALL_GRAPHS } from '../actions/graph_actions';
import { getHeaders } from '../util/other/data_parser';
import { RECEIVE_DATASET,RECEIVE_ALL_DATASETS } from '../actions/dataset_actions';
import Papa from 'papaparse';
import { LOGOUT } from '../actions/session_actions';

const defaultState = {
  graph_index: {},
  current_graph: {},
  errors: []
};

const GraphReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let nextState = merge({}, state);
  switch(action.type){
    case RECEIVE_DATASET:
    let parsed=Papa.parse(action.dataset.data);
    let heads=getHeaders(parsed.data);
    let numHeads=getHeaders(parsed.data,null,true);
      merge(nextState, {current_graph: {x_data: numHeads ? numHeads[0] : null}});
      merge(nextState, {current_graph: {y_data: numHeads[0] ? numHeads[0] : null}});
      merge(nextState, {current_graph: {labels: heads[0] ? heads[0] : null}});
      merge(nextState, {current_graph: {y_data2: numHeads[1] ? numHeads[1] : null}});
      merge(nextState, {current_graph: {y_data3: numHeads[2] ? numHeads[2] : null}});
      merge(nextState, {current_graph: {sort_by: heads[1] ? heads[1] : null}});
      merge(nextState, {current_graph: {graph_type: "area"}});
      merge(nextState, {current_graph: {scaled: "default"}});
      return nextState;
    case RECEIVE_ALL_DATASETS:
      return {current_graph:
        {graph_type: null, y_data: null, x_data: null,
        labels: null, sort_by: null, y_data2: null, y_data3: null,
        title: "Untitled", filter: null, scaled: null, sort_reverse: false}};
    case UPLOAD_GRAPH:
      // console.log(action);
      nextState.graph_index[action.graph.id]=action.graph;
      return nextState;
    case DESTROY_GRAPH:
      // console.log(action);
      delete nextState.graph_index[action.response.id];
      return nextState;
    case RECEIVE_ALL_GRAPHS:
      return merge({}, state, {graph_index: action.graph_index});
    case RECEIVE_GRAPH:
      return merge({}, state, {current_graph: action.graph});
    case LOGOUT: return {};
    default: return state;
  }
};

export default GraphReducer;
