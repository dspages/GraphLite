import { connect } from 'react-redux';
import DatasetForm from './dataset_form';
import { requestUpload } from '../../actions/dataset_actions';

const mapStateToProps = state => ({
  user: state.session.user
});

const mapDispatchToProps = dispatch => ({
    requestUpload: data => dispatch(requestUpload(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetForm);
