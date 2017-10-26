import { connect } from 'react-redux';
import ShareForm from './share_form';
import { requestCreateShare } from '../../actions/share_actions';
import { requestAllDatasets } from '../../actions/dataset_actions';
import { requestAllUsers } from '../../actions/user_actions';
import { allDatasets, allUsers } from "../../reducers/selectors";

const mapStateToProps = state => ({
  user: state.session.user,
  dataset_index: allDatasets(state),
  users: allUsers(state)
});

const mapDispatchToProps = dispatch => ({
  requestCreateShare: (share) => dispatch(requestCreateShare(share)),
  requestAllDatasets: (share) => dispatch(requestAllDatasets(share)),
  requestAllUsers: () => dispatch(requestAllUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareForm);
