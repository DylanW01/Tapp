const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./routes/events');
const bearerToken = require('express-bearer-token');
const oktaAuth = require('./auth');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const open = require('open');

const tappDb = mysql.createConnection({
  host     : 'localhost',
  user     : 'u539298194_admin',
  password : '26GXroYQ]9buy$%E',
  database : 'u539298194_Tapp'
});

tappDb.connect();
const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  //.use(bearerToken())
  //.use(oktaAuth)
  .use(events(tappDb));

//Swagger setup
swaggerDefinition = require('./swagger.json');

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// End of Swagger setup

// START APP
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  console.log(`UI available at http://localhost:${port}/swagger`);
  //open(`http://localhost:${port}/swagger`);
});
