

import { connect } from 'react-redux';
import UserForm from './user_form';
import { requestLogin, requestLogout, requestSignup } from '../../actions/session_actions';

const mapStateToProps = state => ({
  errors: state.session.errors
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(requestLogout()),
  signup: (user) => dispatch(requestSignup(user)),
  login: (user) => dispatch(requestLogin(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
