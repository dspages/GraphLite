import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

const defaultState = {
  session:{
  },
  graph: {current_graph:
    {graph_type: "multi", y_data: "", x_data: "",
    labels: "", sort_by: "", y_data2: "", y_data3: "",
    title: "Untitled", filter: "", sort_reverse: false,
    scaled: "default"}}
};

const configureStore = (preloadedState = defaultState) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )
);

export default configureStore;
