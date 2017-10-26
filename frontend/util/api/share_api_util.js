
export const createShare = function(share){

  return $.ajax({
    method: 'POST',
    url: `./api/shares`,
    data: {share}
  });
};
