const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bowsers = require('./routes/bowsers');
const tickets = require('./routes/tickets');
const stats = require('./routes/stats');
const bearerToken = require('express-bearer-token');
//const oktaAuth = require('./auth');
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
  .use(bowsers(tappDb))
  .use(stats(tappDb))
  .use(tickets(tappDb));

//Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Tapp API',
    description: 'API to manage water bowsers and support tickets.',
    version: '1.0.0',
    contact: {
      email: "admin@tapp.dylanwarrell.com"
    }
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Development server"
    }
  ]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['src/swaggerConfig/*.js'],
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
