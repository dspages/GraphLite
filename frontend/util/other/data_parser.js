
export const isNumeric=function(val){
    return !isNaN(parseFloat(val));
};

export const getHeaders=function(input,delim,numOnly=false){
  if(delim){return input[0].split(delim);}
  if (!numOnly){return input[0];}
  let out=[];
  for (var i = 0; i < input[0].length; i++) {
    if (isNumeric(input[1][i]))
    {out.push(input[0][i]);}
  }
  return out;
};

export const buildDataForOutput=function(input,delim){
  let out=[];
  if(input){
    let obj={};
    let row;
    if(delim) {input=input.split(/\r\n|\n/);}
    let headers=getHeaders(input,delim);
    for (var i = 1; i < input.length; i++) {
      if(delim) {row = input[i].split(delim);}else{row=input[i];}
      obj={};
      for (var j = 0; j < row.length; j++) {
        if(isNaN(row[j])){obj[headers[j]]=row[j];}
        else{obj[headers[j]]=parseFloat(row[j]);}
      }
      if(j>1)//Hack to force last item to not push if it is empty
      {out.push(obj);}
    }
  }
  return out;
};


function parseData(file) {
    let Filename = file.name;
    let reader = new FileReader();
    let fileType= file.type;
}
