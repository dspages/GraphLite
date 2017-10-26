import { merge } from 'lodash';
import { UPLOAD, DESTROY_DATASET, RECEIVE_DATASET, RECEIVE_ALL_DATASETS } from '../actions/dataset_actions';
import {LOGOUT} from '../actions/session_actions';

const defaultState = {
  dataset_index: {},
  errors: [],
  dataset: {}
};

const DatasetReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let nextState = merge({}, state);
  switch(action.type){
    case LOGOUT: return {};
    case UPLOAD:
      return merge({}, state, {dataset_index: merge({[action.dataset.id]: action.dataset}, state.dataset_index)});
      // nextState.dataset_index[action.dataset.id]=action.dataset;
      // return nextState;
    case DESTROY_DATASET:
      delete nextState.dataset_index[action.response.id];
      return nextState;
    case RECEIVE_ALL_DATASETS:
      return merge({}, state, {dataset: {}, dataset_index: merge(action.dataset_index, state.dataset_index)});
    case RECEIVE_DATASET:
      return merge({}, state, {dataset: action.dataset});
    default: return state;
  }
};

export default DatasetReducer;
