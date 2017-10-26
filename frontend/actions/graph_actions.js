
export const UPLOAD_GRAPH = "upload_graph";
export const DESTROY_GRAPH = "destroy_graph";
export const RECEIVE_GRAPH = "receive_graph";
export const EDIT_GRAPH = "edit_graph";
export const RECEIVE_ALL_GRAPHS = "receive_all_graphs";


import { create,destroy,read,index,edit } from '../util/api/graph_api_util';

export const requestEditGraph = (graph) => (dispatch) => {
  return edit(graph)
    .then(response => dispatch(receiveUpload(response)));
};

export const requestAllGraphs = () => (dispatch) => {
  return index()
    .then(graphs => dispatch(receiveAllGraphs(graphs)));
};

export const requestUpload = (graph) => (dispatch) => {
  return create(graph).then(response => {
    dispatch(receiveUpload(response));
    return response;
  });
};

export const requestSingleGraph = (id) => (dispatch) => {
  return read(id).then(response => {
    dispatch(receiveSingleGraph(response));
    return response;
  });
};

export const receiveDestroy = graph => dispatch => (
  destroy(graph.id).then(response => {
    dispatch(destroySingleGraph(response));
    return [];
  })
);

export const destroySingleGraph = response => ({
  type: DESTROY_GRAPH,
  response: response
});

export const receiveAllGraphs = graphs => ({
  type: RECEIVE_ALL_GRAPHS,
  graph_index: graphs
});

export const receiveSingleGraph = graph => ({
  type: RECEIVE_GRAPH,
  graph: graph
});

export const receiveUpload = graph =>({
  type: UPLOAD_GRAPH,
  graph: graph
});
