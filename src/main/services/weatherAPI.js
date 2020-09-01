
var request = require('request');

async function callWeatherApi() {
  return new Promise ((resolve, reject) => {
    request({
      method: 'GET',
      uri: 'http://api.openweathermap.org/data/2.5/forecast?',
      qs: {
          q: 'Buenos Aires',
          appid: '311fb39b7559680910be32f5ab2f7588',
          units: 'metric'
      }  
    }, (err, res, body) => {
      resolve(JSON.parse(body));
    });
    });
  }
 
module.exports = callWeatherApi;