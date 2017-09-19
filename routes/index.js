module.exports = function(app) {

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pinboard', { title: 'Data Flow Bro' });
});

return router;

}
