const express = require('express');
function createRouter(db) {
  const router = express.Router();

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

  router.get('/bowsers/:id', function (req, res, next) {
    db.query(
      'SELECT bowserId, lat, lon, size, createdOn, lastTopUp, status, capacityPercentage FROM bowsers WHERE bowserId deletedState=0',
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

  router.post('/bowsers', (req, res, next) => {
    db.query({
      sql: 'INSERT INTO bowsers (lat, lon, size, status, capacityPercentage) VALUES (?,?,?,?,?)',
      values: [req.body.lat, req.body.lon, req.body.size, req.body.status, req.body.capacity],},
      function (error) {
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
    db.query({
      sql: 'UPDATE bowsers SET lat=?, lon=?, size=?, lastTopUp=?, status=?, capacityPercentage=? WHERE bowserId=?',
      values: [req.body.lat, req.body.lon, req.body.size, req.body.lastTopUp, req.body.status, req.body.capacityPercentage, req.params.id]},
      function (error) {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey('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')
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

  return router;
}

module.exports = createRouter;
