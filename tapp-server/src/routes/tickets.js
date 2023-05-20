const express = require('express');
function createRouter(db) {
  const router = express.Router();

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

  return router;
}

module.exports = createRouter;
