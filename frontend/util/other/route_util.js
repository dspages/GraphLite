
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
    loggedIn ? (
      <Redirect to="/datasets" />
    ) : (
      <Component {...props} />
    )
  )}/>
);

const Protected = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => (
     loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )} />
);

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.user)};
};

export const ProtectedRoute =
withRouter(connect(mapStateToProps, null)(Protected));

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
