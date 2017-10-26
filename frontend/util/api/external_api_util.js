
const companies=["AAPL","GOOG","MSFT","AMZN","FB"];

export const getStocks = function(accum={},num=0,func, user_id) {
  let https = require("https");

  let username = "56388df0b99b7c47a6975f34185edb1e";
  let password = "0ba63916d976061a79d82d9bc620f129";
  let auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

  let request = https.request({
      method: "GET",
      host: "api.intrinio.com",
      path: "/prices?ticker="+companies[num],
      headers: {
          "Authorization": auth
      }
  }, function(response) {
      let json = "";
      response.on('data', function (chunk) {
          json += chunk;
      });
      response.on('end', function() {
          let company = JSON.parse(json);
          accum[companies[num]]=company;
          if (num>=(companies.length-1)) {func(accum, user_id);}
          else{num=num+1; getStocks(accum,num,func, user_id);}
      });
  });

  request.end();
};

// export const getStocks = function(){
//   return $.ajax({
//     method: 'GET',
//     url: `./api/datasets/`
//   });
// };

// export const getStocks = function(){
//   // let url= "http://finance.yahoo.com/d/quotes.csv";
//   // url=url+="?s=AAPL+GOOG+MSFT+AMZN+FB+BRK-A+BABA+JNJ+XOM+JPM";
//   // url=url+="&f=sabkjry";
//   let url="http://query.yahooapis.com/v1/public/"+
//   "yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22"+
//   "AAPL,"+"GOOG,"+"MSFT,"+"AMZN,"+"FB,"+"BRK-A,"+"BABA,"+"JNJ,"+"XOM,"+"JPM"+
//   "%22%29&env=store://datatables.org/alltableswithkeys";
//
//   console.log("Fetching stocks... "+url);
//   let xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = () => {
//     //ready state of DONE means this is complete
//     if (xmlhttp.status === 200 && xmlhttp.readyState === XMLHttpRequest.DONE) {
//       const data = JSON.parse(xmlhttp.responseText);
//       console.log(data);
//       return data;
//     }
//     return "fail";
//   };
//   xmlhttp.open('GET', url, true);
//   xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
//   xmlhttp.setRequestHeader('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
//   xmlhttp.setRequestHeader('Access-Control-Allow-Credentials', 'true');
//   xmlhttp.setRequestHeader('Access-Control-Allow-Headers', ['Origin', 'Content-Type', 'X-Auth-Token']);
//   xmlhttp.send();
// };
