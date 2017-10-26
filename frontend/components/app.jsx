import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './auth/session_form_container';
import UserFormContainer from './auth/user_form_container';
import DatasetContainer from './dataset_index/dataset_form_container';
import DatasetIndexContainer from './dataset_index/dataset_index_container';
import DatasetShowContainer from './dataset_show/dataset_show_container';
import React from 'react';
import { Route, Switch, Link, HashRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/other/route_util';
import ShareFormContainer from './share/share_form_container';

const App = () => (
  <div className="main">
    <Switch>
      <AuthRoute path="/users/new" component={UserFormContainer} />
      <AuthRoute path="/session/new" component={SessionFormContainer} />
      <ProtectedRoute path="/shares/new" component={ShareFormContainer} />
      <ProtectedRoute path="/datasets/new" component={DatasetContainer}/>
      <ProtectedRoute path="/datasets/:datafile_id" component={DatasetShowContainer}/>
      <ProtectedRoute path="/datasets" component={DatasetIndexContainer}/>
      <AuthRoute path="/" component={SessionFormContainer} />
    </Switch>
  </div>
);


export default App;
