var express = require('express'),
    router = express.Router(),
    log = require("log4js").getLogger('route/instances')
    ;

module.exports = function(controller){

    function getInstances(req, res){

        controller.getInstances(function(err, instances){
            if(err){
                //todo better error handling
                return res.json({e:"Error"});
            }
            res.json(instances);
        });

    }

    function startInstances(req, res){
        var instanceId = req.body.instanceId;
        controller.startInstance(instanceId, function(err, data){
            if(err){
                //todo better error handling
                return res.json({e:"Error"});
            }
            res.json({});
        });
    }

    function stopInstances(req, res){
        var instanceId = req.body.instanceId;
        controller.stopInstance(instanceId, function(err, data){
            if(err){
                //todo better error handling
                return res.json({e:"Error"});
            }
            res.json({});
        });
    }

    router.get('/instances', getInstances);
    router.post('/instance/start', startInstances);
    router.post('/instance/stop', stopInstances);

    return router;
};
