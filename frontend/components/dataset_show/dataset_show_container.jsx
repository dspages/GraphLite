import { connect } from 'react-redux';
import DatasetShow from './dataset_show';
import { requestSingleDataset } from '../../actions/dataset_actions';
import { receiveSingleGraph, requestAllGraphs, receiveDestroy } from '../../actions/graph_actions';
import { currentDataset, parsedDataset, getGraphs, selectedGraph, getGraphsByDataset } from '../../reducers/selectors.js';

const mapStateToProps = state => ({
  user: state.session.user,
  dataset: currentDataset(state),
  parsedData: parsedDataset(state),
  graphs: getGraphs(state),
  selectedGraph: selectedGraph(state),
  relevantGraphs: getGraphsByDataset(state)
});

const mapDispatchToProps = dispatch => ({
  requestSingleDataset: (item) => dispatch(requestSingleDataset(item)),
  localUpdateGraph: (graph) => dispatch(receiveSingleGraph(graph)),
  requestAllGraphs: () => dispatch(requestAllGraphs()),
  destroySingleGraph: (graph) => dispatch(receiveDestroy(graph))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetShow);
