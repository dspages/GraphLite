import { connect } from 'react-redux';
import DatasetIndex from './dataset_index';
import { requestAllDatasets, receiveDestroy } from '../../actions/dataset_actions';
import { allDatasets } from '../../reducers/selectors.js';
import { requestGetStocks } from "../../actions/external_api_actions";

const mapStateToProps = state => ({
  user: state.session.user,
  dataset_index: allDatasets(state)
});

const mapDispatchToProps = dispatch => ({
  requestAllDatasets: () => dispatch(requestAllDatasets()),
  receiveDestroy: (dataset) => dispatch(receiveDestroy(dataset)),
  requestGetStocks: (id) => dispatch(requestGetStocks(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetIndex);
