const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/event', (req, res, next) => {
    const owner = req.user.email;
    db.query(
      'INSERT INTO events (owner, name, description, date) VALUES (?,?,?,?)',
      [owner, req.body.name, req.body.description, new Date(req.body.date)],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  // TICKETS

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
            to: 'admin@tapp.dylanwarrell.com',
            from: 'noreply@tapp.dylanwarrell.com',
            template_id: 'd-c3ad14900a2a468b85092daccebab4e6',
            dynamic_template_data: {
              ticketId: req.params.id,
              title: req.body.title || 'Not Provided',
              description: req.body.description  || 'Not Provided',
              type: req.body.type  || 'Not Provided',
              priority: req.body.priority  || 'Not Provided',
          },
          }
          sgMail.send(msg)
          res.status(200).json(results);
        }
      }
    );
  });

  // END OF TICKETS

  // BOWSERS
  router.get('/bowsers', function (req, res, next) {
    db.query(
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

  router.post('/bowsers', (req, res, next) => {
    db.query(
      'INSERT INTO bowsers (lat, lon, size, status, capacityPercentage) VALUES (?,?,?,?,?)',
      [req.body.lat, req.body.lon, req.body.size, req.body.status, req.body.capacity],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey('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')
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

  router.delete('/bowsers/:id', function (req, res, next) {
    db.query(
      'UPDATE bowsers SET deletedState=1 WHERE bowserId=?',
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

  router.put('/bowsers/:id', function (req, res, next) {
    db.query(
      'UPDATE bowsers SET lat=?, lon=?, size=?, lastTopUp=?, status=?, capacityPercentage=? WHERE bowserId=?',
      [req.body.lat, req.body.lon, req.body.size, req.body.lastTopUp, req.body.Status, req.body.capacityPercentage, req.params.Id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey('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')
          const msg = {
            to: 'admin@tapp.dylanwarrell.com',
            from: { "email": "noreply@tapp.dylanwarrell.com", 
                    "name": "Tapp Notifications" 
                  },
            template_id: 'd-45c7b930ae71483eab2223b07fc9e293',
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
  // END OF BOWSERS

  // DASHBOARD INFO CARDS
  router.get('/bowserscount', function (req, res, next) {
    db.query(
      'SELECT COUNT(*) FROM bowsers',
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

  router.get('/activebowserscount', function (req, res, next) {
    db.query(
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

  router.get('/pendingticketcount', function (req, res, next) {
    db.query(
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

  router.get('/activeticketcount', function (req, res, next) {
    db.query(
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

  router.get('/bowserdowncount', function (req, res, next) {
    db.query(
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
  // END OF DASHBOARD INFO CARDS

  return router;
}

module.exports = createRouter;
