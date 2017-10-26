export const create = function(graph){
  return $.ajax({
    method: 'POST',
    url: `./api/graphs`,
    data: {graph}
  });
};

export const destroy = function(id){
  return $.ajax({
    method: 'DELETE',
    url: `./api/graphs/${id}`,
  });
};

export const index = function(){
  return $.ajax({
    method: 'GET',
    url: `./api/graphs/`
  });
};

export const read = function(id){
  return $.ajax({
    method: 'GET',
    url: `./api/graphs/${id}`
  });
};

export const edit = function(graph){
  return $.ajax({
    method: 'PATCH',
    url: `./api/graphs/${graph.id}`
  });
};
