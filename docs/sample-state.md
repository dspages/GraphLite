```js{
  currentUser: {
    id: 1,
    username: "dabus_fell"
  },
  dataset: {
    user_id: 1,
    public: true,
    id: 5,
    title: "US population by state 1950-2010",
    data: {...}
  },
  graphs: [{
    datafile_id: 5,
    title: "Alaska population by year",
    id: 2,
    params: {
      type: "scatter",
      xAxis: "year",
      yAxis: "population",
      filter: "state=AK"
    },{
      datafile_id: 5,
      title: "Population of each state in 1996",
      id: 6,
      params: {
        type: "scatter",
        xAxis: "state",
        yAxis: "population",
        filter: "year=1996"
    }],
    graphForm: {
      datafile_id: 5,
      title: "My new graph",
      params:{
        type: "histogram",
        xAxis: "year",
        yAxis: "population",
        filter: "state=CA"
      }
    }
  }
