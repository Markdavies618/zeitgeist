var requestData = require('../lib/request-data.js');

function jsonifier(err, req, res, log_error, log_success, callback) {
  if(typeof res === 'Array' && res.length === 0) {
    res = {success: "false"};
  } else if (res === undefined) {
    res = {success: "false"};
  }

  if(!err) {
    var reqObj  = requestData.getRequestData(req);
    var json    = JSON.stringify(res);
    // If the format is jsonp then return with the additional callback query value
    // json = (reqObj.format === 'jsonp') ? reqObj.callback + '({ results: ' + json + '});' : json ;
    callback.writeHead(200, {
        'content-type': 'application/json'
      , 'Access-Control-Allow-Origin': '*'
    });
    callback.write(json);
    callback.end();

  } else {
    // logger.error(log_error, err);
    callback.writeHead(500);
  }
}

var mod = {};
mod.jsonify = jsonifier;
module.exports = mod; //jsonifier;