
export const DOWNLOAD_FROM_YAHOO = "download";
export const UPLOAD_TO_GRAPHLITE = "upload";
import { getStocks } from '../util/api/external_api_util';
import { receiveUpload, requestUpload, UPLOAD } from './dataset_actions';
import { create } from '../util/api/dataset_api_util';
import Papa from 'papaparse';

const varList=["open","close","volume"];

const processStockData = (data)=>{
  let out=[];
  for (var k = 0; k < 100; k++) {
    out[k]={};
  }
  let date="";
  let companies=Object.keys(data);
  for (let i = 0; i < companies.length; i++) {
    let company=companies[i];
    let thisData=data[company].data;
    for (let j = 0; j < thisData.length; j++) {
      for (var l = 0; l < varList.length; l++) {
        out[j][`${company}${varList[l]}`]
        =thisData[j][varList[l]];
      }
      out[j][`date`]
      =thisData[j]["date"];
    }
    if(date==="") {date=thisData[0]["date"];}
  }
  return {data: out,date: date};
};

export const assembleDataset = (stocks, user_id) => {
  let parsedData=processStockData(stocks);
  let unparsed=Papa.unparse(parsedData.data);
  return {data: unparsed, user_id: user_id, privacy: false, title: `Stock Prices ${parsedData.date}`};
};

export const requestGetStocks = (user_id) => (dispatch) => {
  return getStocks({},0,
    (stocks,id) =>
  {
    let assembled=assembleDataset(stocks,id);
    create(assembled).
    then(response=>{
      dispatch(receiveUpload(response));
    });
  }
  , user_id);
};

export const receiveStockData = data =>({
  type: UPLOAD,
  data: data
});
