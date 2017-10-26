import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import DatasetReducer from './dataset_reducer';
import GraphReducer from './graph_reducer';
import UsersReducer from './users_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  data: DatasetReducer,
  graph: GraphReducer,
  users: UsersReducer
});

export default rootReducer;
