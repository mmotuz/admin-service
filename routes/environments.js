var express = require('express');
var router = express.Router();

module.exports = function(){

    router.get('/', function(req, res, next) {
        var data = [
                { "prefix": "br1", "name": "Test server br1", "status": "online"},
                { "prefix": "br2", "name": "Test server br2", "status": "online"},
                { "prefix": "int", "name": "Integration", "status": "online"},
                { "prefix": "stg", "name": "Staging", "status": "offline"},
                { "prefix": "www", "name": "Production", "status": "online"}
            ]
            ;

        res.json(data);
    });
    return router;
};
