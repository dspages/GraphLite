import { connect } from 'react-redux';
import GraphForm from './graph_form';
import { currentDataset, selectedGraph, parsedDataset } from '../../reducers/selectors.js';
import { receiveSingleGraph, requestEditGraph, requestAllGraphs, requestSingleGraph, requestUpload, receiveDestroy } from "../../actions/graph_actions";

const mapStateToProps = state => ({
  user: state.session.user,
  dataset: currentDataset(state),
  parsedDataset: parsedDataset(state),
  selectedGraph: selectedGraph(state)
});

const mapDispatchToProps = dispatch => ({
  requestEditGraph: (graph) => dispatch(requestEditGraph(graph)),
  requestAllGraphs: () => dispatch(requestAllGraphs()),
  requestUploadGraph: (graph) => dispatch(requestUpload(graph)),
  receiveDestroyGraph: (graph) => dispatch(receiveDestroy(graph)),
  requestSingleGraph: (graph) => dispatch(requestSingleGraph(graph)),
  localUpdate: (graph) => dispatch(receiveSingleGraph(graph))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphForm);
