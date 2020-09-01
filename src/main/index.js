const Routes = require('./routes');
const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = Express();

const dbPort = '27017'
const listeningPort = 3000
const schema = '/meetup'
const dbUrl = "mongodb://localhost:" + dbPort + schema;

app.use(bodyParser.json());

console.log("La base de datos esta corriendo correctamente");
app.listen(listeningPort, () => {
    console.log("El servidor está inicializado en el puerto " + listeningPort);
});

app.use(cors());
app.use('/aymat', Routes.aymatRouter);




 
