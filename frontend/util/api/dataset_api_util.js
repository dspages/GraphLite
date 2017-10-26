export const create = function(dataset){
  return $.ajax({
    method: 'POST',
    url: `./api/datasets`,
    data: {dataset}
  });
};

export const destroy = function(id){
  return $.ajax({
    method: 'DELETE',
    url: `./api/datasets/${id}`,
  });
};

export const index = function(){
  return $.ajax({
    method: 'GET',
    url: `./api/datasets/`
  });
};

export const read = function(id){
  return $.ajax({
    method: 'GET',
    url: `./api/datasets/${id}`
  });
};
