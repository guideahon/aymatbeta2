var request = require('request');

async function CallLogin(user, pass) {
  return new Promise ((resolve, reject) => {
    request({
      method: 'POST',
      uri: 'http://server.growatt.com/LoginAPI.do?',
      qs: {
        userName: user,
        password: pass
      }
    }, (err, res, body) => {
      resolve(res);
    });
  });
}

function GetPlants(userId, headers) {
  return new Promise ((resolve, reject) => {
    request({
      method: 'GET',
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "cookie": headers
      },
      uri: 'http://server.growatt.com/PlantListAPI.do?',
      qs: {
        userId: userId
      }
    }, (err, res, body) => {
      resolve(JSON.parse(body));
    });
  });
}

function GetPlantDetial(plantId, cookies) {
  return new Promise ((resolve, reject) => {
    request({
      method: 'GET',
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "cookie": cookies
      },
      uri: 'http://server.growatt.com/newPlantAPI.do?',
      qs: {
        op: "getAllDeviceListThree",
        plantId: plantId,
        pageNum: 1,
        pageSize: 1
      }
    }, (err, res, body) => {
      resolve(JSON.parse(body));
    });
  });
}

module.exports = { CallLogin, GetPlantDetial, GetPlants};