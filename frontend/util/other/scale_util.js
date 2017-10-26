import { merge } from 'lodash';

// [{key1: num1, key2: num2, key3: num3},
// {key1: num4, key2: num5, key3: num6},
// {key1: num7, key2: num8, key3: num9}]

export const logScale = function (data, key) {
  let returnVal=data.map(function(el) {
    return merge({}, el);
  });
  for (let i = 0; i < returnVal.length; i++) {
    returnVal[i][key]=[returnVal[i][key]].pop();
    if(returnVal[i][key]<=0) {returnVal[i][key]=0;}
    else {returnVal[i][key]=Math.log10(returnVal[i][key]);}
  }
  return returnVal;
};

export const normScale = function (data, key) {
  let returnVal=data.map(function(el) {
    return merge({}, el);
  });
  let max=returnVal[0][key];
  for (var i = 1; i < returnVal.length; i++) {
    if(returnVal[i][key]>max) {max=returnVal[i][key];}
  }
  for (let j = 0; j < returnVal.length; j++) {
    returnVal[j][key]=[returnVal[j][key]].pop();
    if(returnVal[j][key]<=0) {returnVal[j][key]=0;}
    else {returnVal[j][key]=returnVal[j][key]/max;}
  }
  return returnVal;
};

export const rangeScale = function (data, key) {
  let returnVal=data.map(function(el) {
    return merge({}, el);
  });
  let min=returnVal[0][key];
  let max=returnVal[0][key];
  for (var i = 1; i < returnVal.length; i++) {
    if(returnVal[i][key]<min) {min=returnVal[i][key];}
    if(returnVal[i][key]>max) {max=returnVal[i][key];}
  }
  for (let j = 0; j < returnVal.length; j++) {
    returnVal[j][key]=[returnVal[j][key]].pop();
    returnVal[j][key]=(returnVal[j][key]-min)/(max-min);
  }
  return returnVal;
};

export const sciScale = function (data, key) {
  let returnVal=data.map(function(el) {
    return merge({}, el);
  });
  let max=returnVal[0][key];
  for (var i = 1; i < returnVal.length; i++) {
    if(returnVal[i][key]>max) {max=returnVal[i][key];}
  }

  let n=1;
  while(n*10<max){n=n*10;}
  while(n>max){n=n/10;}

  for (let j = 0; j < returnVal.length; j++) {
    returnVal[j][key]=[returnVal[j][key]].pop();
    if(returnVal[j][key]<=0) {returnVal[j][key]=0;}
    else {returnVal[j][key]=returnVal[j][key]/n;}
  }
  return returnVal;
};




//END OF FILE
