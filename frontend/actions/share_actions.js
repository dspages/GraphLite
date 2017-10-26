import { createShare } from '../util/api/share_api_util';


export const requestCreateShare = (share) => (dispatch) => {
  return createShare(share);
};
