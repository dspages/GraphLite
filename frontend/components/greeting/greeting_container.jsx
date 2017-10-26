import { connect } from 'react-redux';
import GreetingForm from './greeting';
import { requestLogin, requestLogout, requestSignup } from '../../actions/session_actions';
import { selectCurrentUser } from '../../reducers/selectors';

const mapStateToProps = state => ({
  user: selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
  logout: (user) => dispatch(requestLogout(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GreetingForm);
