var express = require('express');
var router = express.Router();
var path = require('path');


module.exports = function(){

    router.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../', 'index.html'));
    });
    return router;
};
