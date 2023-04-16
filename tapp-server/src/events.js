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

  router.get('/bowsers', function (req, res, next) {
    //const owner = req.user.email;
    db.query(
      'SELECT bowserId, lat, lon, size, createdOn, lastTopUp, status FROM bowsers',
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
      'SELECT COUNT(*) FROM bowsers WHERE status = "Needs Attention"',
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

  router.put('/updateBowsers', function (req, res, next) {
    //const owner = req.user.email;
    db.query(
      'UPDATE bowsers SET lat=?, lon=?, size=?, lastTopUp=?, status=? WHERE id=?',
      [req.body.lat, req.body.lon, req.body.size, req.body.lastTopUp, req.body.Status, req.body.Id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;
