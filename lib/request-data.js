function getRequestData (request){
  if(Object.getOwnPropertyNames(request.body).length !== 0) {
    // console.log('body');
    if(request.body.format === undefined) {
      request.body.format = 'json';
    }
    return request.body;
  } else if(Object.getOwnPropertyNames(request.query).length !== 0) {
    // console.log('query');
    if (request.query.format === undefined) {
      request.query.format = 'json';
    }
    return request.query;
  } else {
    // console.log('no');
    return {format: 'json'};
  }
}

var requestData = {};
requestData.getRequestData = getRequestData;
module.exports = requestData;