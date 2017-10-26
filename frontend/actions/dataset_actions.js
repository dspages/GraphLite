
export const UPLOAD = "upload";
export const DESTROY_DATASET = "destroy_dataset";
export const RECEIVE_DATASET = "receive_dataset";
export const RECEIVE_ALL_DATASETS = "receive_all_datasets";


import { create,destroy,read,index } from '../util/api/dataset_api_util';

export const requestAllDatasets = () => (dispatch) => {
  return index()
    .then(datasets => dispatch(receiveAllDatasets(datasets)));
};

export const requestUpload = (dataset) => (dispatch) => {
  return create(dataset).then(response => {
    dispatch(receiveUpload(response));
    return response;
  });
};

export const requestSingleDataset = (id) => (dispatch) => {
  return read(id).then(response => {
    dispatch(receiveSingleDataset(response));
    return response;
  });
};

export const receiveDestroy = dataset => dispatch => (
  destroy(dataset.id).then(response => {
    dispatch(destroySingleDataset(response));
    return [];
  })
);

export const destroySingleDataset = response => ({
  type: DESTROY_DATASET,
  response: response
});

export const receiveAllDatasets = datasets => ({
  type: RECEIVE_ALL_DATASETS,
  dataset_index: datasets
});

export const receiveSingleDataset = dataset => ({
  type: RECEIVE_DATASET,
  dataset: dataset
});

export const receiveUpload = dataset =>({
  type: UPLOAD,
  dataset :dataset
});
