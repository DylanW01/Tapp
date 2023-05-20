const express = require('express');
function createRouter(db) {
  const router = express.Router();

  // Get all tickets
  router.get('/tickets', function (req, res, next) {
    db.query(
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
  router.get('/tickets/:id', function (req, res, next) {
    db.query(
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
  router.delete('/tickets/:id', function (req, res, next) {
    db.query(
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
  router.put('/tickets/:id', function (req, res, next) {
    db.query({
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
  router.post('/tickets', (req, res, next) => {
    db.query({
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

  return router;
}

module.exports = createRouter;
