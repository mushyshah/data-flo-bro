module.exports = function(app) {
    
    var express = require('express');
    var router = express.Router();

    // POST method for pinging widgets route
    router.post('/', function (req, res) {
        
      app.io.sockets.emit('ping', req.body);

            res.send('pinging objects');
    
    });
    
    return router;
    
    }
    