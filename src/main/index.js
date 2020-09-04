const Routes = require('./routes');
const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = Express();

const { CallLogin, GetPlantDetial, GetPlants} = require("./services/growattAPI");
const dbPort = '27017'
const listeningPort = 3000
const schema = '/meetup'
const dbUrl = "mongodb://localhost:" + dbPort + schema;

app.use(bodyParser.json());
app.use(cors());

app.get("/", function(req, res) {
  res.send(
    '<style>*{font-family: sans-serif;background-color:black;color:lawngreen;}</style>' +
      '<center>' +
      '<h1>AYMAT HACKING PROXY</h1></center>'
  );
});

app.get("/aymat/plant/:plantId", function(req, res) {
    CallLogin(req.query.u, req.query.p)
        .then((data) => {
            var responseCookies = data.headers['set-cookie'];
            var requestCookies='';
            for(var i=0; i<responseCookies.length; i++){
                var oneCookie = responseCookies[i];
                oneCookie = oneCookie.split(';');
                requestCookies= requestCookies + oneCookie[0]+';';
            }
            GetPlantDetial(req.params.plantId, requestCookies)
                .then(plants => {
                    return res.status(200).send(plants);
                })
                // .catch(error => console.log(error));
        })
        // .catch(error => console.log(error));
});

app.get("/aymat/plants", function(req, res) {
    CallLogin(req.query.u, req.query.p)
        .then((data) => {
            var responseCookies = data.headers['set-cookie'];
            var requestCookies='';
            for(var i=0; i<responseCookies.length; i++){
                var oneCookie = responseCookies[i];
                oneCookie = oneCookie.split(';');
                requestCookies= requestCookies + oneCookie[0]+';';
            }

            GetPlants(JSON.parse(data.body).back.userId, requestCookies)
                .then(plants => {
                    return res.status(200).send(plants);
                })
                // .catch(error => console.log(error));
        })
        // .catch(error => console.log(error));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("El servidor está inicializado en el puerto " + PORT);
});


 
