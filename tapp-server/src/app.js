const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const request = require("request");
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const axios = require('axios');
const appVersion = require("../package.json").version;


//#region DB Setup - Create connection to database - Uses .env file for credentials
var tappDb  = mysql.createPool({
  connectionLimit : 10,
  host       : process.env.DBHOST,
  user       : process.env.DBUSER,
  password   : process.env.DBPASS,
  database   : process.env.DBNAME
});

const port = process.env.PORT || 8080;
//#endregion

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(express.json())
  //.use(bearerToken())
  // .use(helmet()) // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet

  const checkJwt = auth({
    audience: 'tapp',
    issuerBaseURL: `https://tapp.uk.auth0.com`,
    tokenSigningAlg: 'RS256'
  });

//#region Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Tapp API',
    description: 'API to manage water bowsers, support tickets and user accounts.',
    version: appVersion,
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

const swaggerOptions = {
  swaggerOptions: {
     oauth: {
        clientId: "YtDD0pvA2wPHiquxaLI7JpPoJtOhGS4S",
        clientSecret: process.env.TAPP_API_CLIENT_SECRET
     },
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['src/swaggerConfig/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
//#endregion

  //#region Bowsers
  app.get('/bowsers', checkJwt, function (req, res, next) {
    tappDb.query(
      'SELECT bowserId, lat, lon, size, createdOn, lastTopUp, status, capacityPercentage FROM bowsers WHERE deletedState=0',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  app.get('/bowsers/:id', checkJwt, function (req, res, next) {
    tappDb.query(
      'SELECT bowserId, lat, lon, size, createdOn, lastTopUp, status, capacityPercentage FROM bowsers WHERE bowserId=? AND deletedState=0',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  app.post('/bowsers', checkJwt, (req, res, next) => {
    tappDb.query({
      sql: 'INSERT INTO bowsers (lat, lon, size, status, capacityPercentage) VALUES (?,?,?,?,?)',
      values: [req.body.lat, req.body.lon, req.body.size, req.body.status, req.body.capacity],},
      function (error) {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey(process.env.SENDGRIDAPI)
          const msg = {
            to: 'd.warrell@outlook.com',
            from: { "email": "noreply@tapp.dylanwarrell.com", 
                    "name": "Tapp Notifications" 
                  },
            template_id: 'd-0cbe4dc6485b45c89a079bc281585bc0',
            dynamic_template_data: {
              lat: req.body.lat || 'Not Provided',
              lon: req.body.lon  || 'Not Provided',
              size: req.body.size  || 'Not Provided',
            },
            asm: {
              group_id: 21373,
            },
          }
          sgMail.sendMultiple(msg)
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

 // const checkBowserDeleteScopes = requiredScopes('delete:bowsers');

  app.delete('/bowsers/:id', checkJwt, function (req, res, next) {
    tappDb.query(
      'UPDATE bowsers SET deletedState=1 WHERE bowserId=?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey(process.env.SENDGRIDAPI)
          const msg = {
            to: ['d.warrell@outlook.com'],
            from: { "email": "noreply@tapp.dylanwarrell.com", 
                    "name": "Tapp Notifications" 
                  },
            template_id: 'd-34732a0e031b4eaea05f6f482c31b7d6',
            dynamic_template_data: {
              bowserId: req.params.id,
              lat: req.body.lat || 'Not Provided',
              lon: req.body.lon  || 'Not Provided',
              size: req.body.size  || 'Not Provided',
              status: req.body.status  || 'Not Provided',
              capacityPercentage: req.body.capacityPercentage  || 'Not Provided',
            },
            asm: {
              group_id: 21374,
            },
          }
          sgMail.sendMultiple(msg)
          res.status(200).json(results);
        }
      }
    );
  });

  app.put('/bowsers/:id', function (req, res, next) {
    tappDb.query({
      sql: 'UPDATE bowsers SET lat=?, lon=?, size=?, lastTopUp=?, status=?, capacityPercentage=? WHERE bowserId=?',
      values: [req.body.lat, req.body.lon, req.body.size, req.body.lastTopUp, req.body.status, req.body.capacityPercentage, req.params.id]},
      function (error) {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey(process.env.SENDGRIDAPI)
          const msg = {
            to: ['d.warrell@outlook.com'],
            from: { "email": "noreply@tapp.dylanwarrell.com", 
                    "name": "Tapp Notifications" 
                  },
            template_id: 'd-2714ea99c189424abb590804a7347fc4',
            dynamic_template_data: {
              bowserId: req.params.id,
              lastTopUp: req.body.lastTopUp  || 'Not Provided',
              lat: req.body.lat || 'Not Provided',
              lon: req.body.lon  || 'Not Provided',
              size: req.body.size  || 'Not Provided',
              status: req.body.Status  || 'Not Provided',
              capacityPercentage: req.body.capacityPercentage  || 'Not Provided',
            },
            asm: {
              group_id: 21375,
            },
          }
          sgMail.sendMultiple(msg)
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });
  //#endregion

  //#region Tickets

  // Get all tickets
  app.get('/tickets', checkJwt, function (req, res, next) {
    tappDb.query(
      'SELECT requestId, title, description, type, status, lat, lon, priority FROM tickets WHERE deletedState=0',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // Get ticket by ID
  app.get('/tickets/:id', checkJwt, function (req, res, next) {
    tappDb.query(
      'SELECT requestId, title, description, type, status, lat, lon, priority FROM tickets WHERE requestId=? AND deletedState=0',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // Soft delete ticket by ID
  app.delete('/tickets/:id', checkJwt, function (req, res, next) {
    tappDb.query(
      'UPDATE tickets SET deletedState=1 WHERE requestId=?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey('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')
          const msg = {
            to: ['d.warrell@outlook.com'],
            from: { "email": "noreply@tapp.dylanwarrell.com", 
                    "name": "Tapp Notifications" 
                  },
            template_id: 'd-616d56481cb745cf83b0cf56a4e2e516',
            dynamic_template_data: {
              id: req.params.id,
              title: req.body.title  || 'Not Provided',
              description: req.body.description || 'Not Provided',
              type: req.body.type  || 'Not Provided',
              status: req.body.status  || 'Not Provided',
              priority: req.body.priority  || 'Not Provided',
              lat: req.body.lat  || 'Not Provided',
              lng: req.body.lng  || 'Not Provided',
            },
            asm: {
              group_id: 21403,
            },
          }
          sgMail.sendMultiple(msg)
          res.status(200).json(results);
        }
      }
    );
  });

  // Update ticket by ID
  app.put('/tickets/:id', checkJwt, function (req, res, next) {
    tappDb.query({
      sql: 'UPDATE tickets SET title=?, description=?, type=?, status=?, lat=?, lon=?, priority=? WHERE requestId=?',
      values: [req.body.title, req.body.description, req.body.type, req.body.status, req.body.lat, req.body.lon, req.body.priority, req.params.id]},
      function (error) {
        if (error) {
          res.status(500).json();
        } else {
          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey('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')
          const msg = {
            to: ['d.warrell@outlook.com'],
            from: { "email": "noreply@tapp.dylanwarrell.com", 
                    "name": "Tapp Notifications" 
                  },
            template_id: 'd-a22f593d082a4a94af402fca5dfb1fc4',
            dynamic_template_data: {
              id: req.params.id,
              title: req.body.title  || 'Not Provided',
              description: req.body.description || 'Not Provided',
              type: req.body.type  || 'Not Provided',
              status: req.body.status  || 'Not Provided',
              priority: req.body.priority  || 'Not Provided',
              lat: req.body.lat  || 'Not Provided',
              lng: req.body.lng  || 'Not Provided',
            },
            asm: {
              group_id: 21405,
            },
          }
          sgMail.sendMultiple(msg)
          res.status(200).json();
        }
      }
    );
  });

  // Create new ticket
  app.post('/tickets', checkJwt, (req, res, next) => {
    tappDb.query({
      sql: 'INSERT INTO tickets (title, description, type, status, lat, lon, priority) VALUES (?,?,?,?,?,?,?)',
      values: [req.body.title, req.body.description, req.body.type, req.body.status, req.body.lat, req.body.lng, req.body.priority],},
      function (error) {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey('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')
          const msg = {
            to: ['d.warrell@outlook.com'],
            from: { "email": "noreply@tapp.dylanwarrell.com", 
                    "name": "Tapp Notifications" 
                  },
            template_id: 'd-996269fdef7c4b7b9ded677d15a91844',
            dynamic_template_data: {
              id: req.params.id,
              title: req.body.title  || 'Not Provided',
              description: req.body.description || 'Not Provided',
              type: req.body.type  || 'Not Provided',
              status: req.body.status  || 'Not Provided',
              priority: req.body.priority  || 'Not Provided',
              lat: req.body.lat  || 'Not Provided',
              lng: req.body.lng  || 'Not Provided',
            },
            asm: {
              group_id: 21404,
            },
          }
          sgMail.sendMultiple(msg)
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });
  //#endregion

  //#region User Accounts

  // Create user
  app.post('/users', checkJwt, (req, res, next) => {
    // Get token for Auth0 Management API
    const auth0ManagementApi = { method: 'POST',
      url: 'https://tapp.uk.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"5pYyzRbCvntlRjP9UwTTHG83sN6dy67W","client_secret":"'+process.env.TAPP_SERVER_AUTH0_API_CLIENT_SECRET+'","audience":"https://tapp.uk.auth0.com/api/v2/","grant_type":"client_credentials"}' };
    
    request(auth0ManagementApi, function (error, response, body) {
      if (error) {
        throw new Error(error)
      };
  
    const parsedBody = JSON.parse(body);
    const TOKEN = parsedBody.access_token

    // Create user object
    let data = JSON.stringify({
      "email": req.body.email,
      "blocked": req.body.blocked,
      "email_verified": req.body.email_verified,
      "given_name": req.body.given_name,
      "family_name": req.body.family_name,
      "name": req.body.name,
      "picture": req.body.picture,
      "connection": "Username-Password-Authentication",
      "password": req.body.password,
      "verify_email": req.body.verify_email,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://tapp.uk.auth0.com/api/v2/users',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Authorization': 'Bearer ' + TOKEN
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(response);
      res.status(200).json({status: 'ok'});
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({status: 'error'});
    });
    });
  });

  // Delete user
  app.delete('/users/:id', checkJwt, function (req, res, next) {
    const auth0ManagementApi = { method: 'POST',
      url: 'https://tapp.uk.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"5pYyzRbCvntlRjP9UwTTHG83sN6dy67W","client_secret":"'+process.env.TAPP_SERVER_AUTH0_API_CLIENT_SECRET+'","audience":"https://tapp.uk.auth0.com/api/v2/","grant_type":"client_credentials"}' };
    
    request(auth0ManagementApi, function (error, response, body) {
      if (error) {
        throw new Error(error)
      };
  
    const parsedBody = JSON.parse(body);
    const TOKEN = parsedBody.access_token

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'https://tapp.uk.auth0.com/api/v2/users/'+[req.params.id],
      headers: { 
        'Authorization': 'Bearer ' + TOKEN
      }
    };

    axios.request(config)
    .then((response) => {
      console.log(response.data);
      res.status(200).json({status: 'ok'});
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({status: 'error'});
    });
    });
  });

  // Get admin users
  app.get('/users/role/admin', checkJwt, function (req, res, next) {
    // Get token for Auth0 Management API
    const auth0ManagementApi = { method: 'POST',
      url: 'https://tapp.uk.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"5pYyzRbCvntlRjP9UwTTHG83sN6dy67W","client_secret":"'+process.env.TAPP_SERVER_AUTH0_API_CLIENT_SECRET+'","audience":"https://tapp.uk.auth0.com/api/v2/","grant_type":"client_credentials"}' };
    
    request(auth0ManagementApi, function (error, response, body) {
      if (error) {
        throw new Error(error)
      };
  
    const parsedBody = JSON.parse(body);
    const TOKEN = parsedBody.access_token

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://tapp.uk.auth0.com/api/v2/roles/rol_nWQlv99CkRtuf32M/users',
      headers: { 
        'Accept': 'application/json', 
        'Authorization': 'Bearer ' + TOKEN
      }
    };

    axios.request(config)
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({status: 'error'});
    });
    });
  });
  //#endregion

  //#region Stats
  app.get('/bowserticketstats', checkJwt, async function (req, res, next) {
    try {
      const bowsersCountPromise = getCount('SELECT COUNT(*) FROM bowsers WHERE deletedState=0');
      const activeBowsersCountPromise = getCount('SELECT COUNT(*) FROM bowsers WHERE status = "Active"');
      const pendingTicketCountPromise = getCount('SELECT COUNT(*) FROM tickets WHERE status = "Pending"');
      const activeTicketCountPromise = getCount('SELECT COUNT(*) FROM tickets WHERE status = "In Progress"');
      const bowserDownCountPromise = getCount('SELECT COUNT(*) FROM bowsers WHERE status IN ("Problematic", "Down", "Out of Service", "Maintenance", "Needs Attention")');
  
      const [bowsersCount, activeBowsersCount, pendingTicketCount, activeTicketCount, bowserDownCount] = await Promise.all([
        bowsersCountPromise,
        activeBowsersCountPromise,
        pendingTicketCountPromise,
        activeTicketCountPromise,
        bowserDownCountPromise
      ]);
  
      const mergedCounts = {
        bowsersCount,
        activeBowsersCount,
        pendingTicketCount,
        activeTicketCount,
        bowserDownCount
      };
  
      res.status(200).json(mergedCounts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error' });
    }
  });
  
  function getCount(query) {
    return new Promise((resolve, reject) => {
      tappDb.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]['COUNT(*)']);
        }
      });
    });
  }
  
  app.get('/bowserscount', checkJwt, function (req, res, next) {
    tappDb.query(
      'SELECT COUNT(*) FROM bowsers WHERE deletedState=0',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  app.get('/activebowserscount', checkJwt, function (req, res, next) {
    tappDb.query(
      'SELECT COUNT(*) FROM bowsers WHERE status = "Active"',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  app.get('/pendingticketcount', checkJwt, function (req, res, next) {
    tappDb.query(
      'SELECT COUNT(*) FROM tickets WHERE status = "Pending"',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  app.get('/activeticketcount', checkJwt, function (req, res, next) {
    tappDb.query(
      'SELECT COUNT(*) FROM tickets WHERE status = "In Progress"',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  app.get('/bowserdowncount', checkJwt, function (req, res, next) {
    tappDb.query(
      'SELECT COUNT(*) FROM bowsers WHERE status = "Problematic" OR status = "Down" OR status = "Out of Service" OR status = "Maintenance" OR status = "Needs Attention"',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  //#endregion

// START APP
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  console.log(`UI available at http://localhost:${port}/swagger`);
});
