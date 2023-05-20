const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bowsers = require('./routes/bowsers');
const tickets = require('./routes/tickets');
const stats = require('./routes/stats');
const bearerToken = require('express-bearer-token');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet');

// Database connection - Change to local credentials for development
var tappDb  = mysql.createPool({
  connectionLimit : 10,
  host            : 'srv710.hstgr.io',
  user            : 'u539298194_admin',
  password        : '31$Dc8F4yvcRUMJGS&ZH',
  database        : 'u539298194_Tapp'
});

/*var tappDb  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'u539298194_admin',
  password        : '31$Dc8F4yvcRUMJGS&ZH',
  database        : 'u539298194_Tapp'
});*/

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
 // .use(helmet()) // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
  .use(bodyParser.json())
  //.use(bearerToken())
  .use(bowsers(tappDb))
  .use(stats(tappDb))
  .use(express.json())
  .use(tickets(tappDb));

//Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Tapp API',
    description: 'API to manage water bowsers, support tickets and user accounts.',
    version: '1.0.0',
    contact: {
      email: "admin@tapp.dylanwarrell.com"
    }
  },
  host: 'tapp-server.onrender.com',
  servers: [
    {
      url: "https://tappapi.dylanwarrell.com:443",
      description: "Production server"
    },
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
});
