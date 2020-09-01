var request = require('request');

async function CallLogin() {
  return new Promise ((resolve, reject) => {
    request({
      method: 'POST',
      uri: 'http://server.growatt.com/LoginAPI.do?',
      qs: {
          userName: 'Matias Toledo',
          password: '57c93b317857a3437f3b778d9455529a'
      }
    }, (err, res, body) => {
      resolve(JSON.parse(body));
    });
    });
  }
 
module.exports = CallLogin;