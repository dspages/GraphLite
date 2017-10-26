
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { requestLogin, requestLogout, requestSignup } from '../../actions/session_actions';

const mapStateToProps = state => ({
  errors: state.session.errors
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(requestLogin(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
