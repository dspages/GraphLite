export const allUsers = function(){
  return $.ajax({
    method: 'GET',
    url: `./api/users/`
  });
};
