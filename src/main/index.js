const Routes = require('./routes');
const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = Express();

const CallLogin = require("./services/growattAPI");
const dbPort = '27017'
const listeningPort = 3000
const schema = '/meetup'
const dbUrl = "mongodb://localhost:" + dbPort + schema;

app.use(bodyParser.json());
app.use(cors());

app.get("/", function(req, res) {
  res.send(
    '<style>*{font-family: sans-serif;background-color:black;color:lawngreen;}</style><center><h1>AYMAT HACKING PROXY</h1></center>'
  );
});

app.get("/aymat/ping", function(req, res) {
    CallLogin()
        .then((data) => {
            return res.status(200).send(data);
        })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("El servidor está inicializado en el puerto " + PORT);
});


 
