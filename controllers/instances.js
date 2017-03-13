var log = require("log4js").getLogger('controllers/instances'),
    AWS = require ("aws-sdk"),
    async = require("async")
    ;

module.exports = function(config){
    var stack = new AWS.OpsWorks(
            {
                region: config.aws.region,
                accessKeyId: config.aws.access_key_id,
                secretAccessKey: config.aws.secret_access_key
            }
        );
    var api = {
            getInstances:getInstances,
            startInstance: startInstance,
            stopInstance: stopInstance
        };

    return api;

    function getInstances(cbk){
        async.waterfall(
            [
                function(cbk){
                    getStacks(function(err, stacks){
                        if(err){
                            return cbk(err);
                        }
                        cbk(null, stacks[0].StackId);
                    })
                },
                getStackInstances

            ],
            function(err, instancesData){
                if(err){
                    log.error("getInstances failed ", err);
                    return cbk(err);
                }
                var responseData = instancesData.map(function(instance){
                    return {
                        instanceId: instance.InstanceId,
                        instanceType: instance.InstanceType,
                        hostname: instance.Hostname,
                        privateIp: instance.PrivateIp || "",
                        publicIp: instance.PublicIp || "",
                        os: instance.Os,
                        status: instance.Status,
                        availabilityZone: instance.AvailabilityZone
                    }
                });
                cbk(null, responseData);
            }
        );
    }

    function startInstance(id, cbk){
        log.info("Starting instance %s", id);
        if(!id){
            log.info("Can't start instance without instanceId");
            return cbk(null);
        }
        stack.startInstance({InstanceId: id}, function(err, data) {
            if(err){
                log.error("Start instance failed. instanceId = %s err = ", id, err);
                return cbk(err);
            }

            log.info("Start instance success. instanceId = %s", id);
            cbk(null, null);
        });
    }

    function stopInstance(id, cbk){
        log.info("Stopping instance %s", id);
        if(!id){
            log.info("Can't stop instance without instanceId");
            return cbk(null);
        }
        stack.stopInstance({InstanceId: id}, function(err, data) {
            if(err){
                log.error("Stop instance failed. instanceId = %s err = ", id, err);
                return cbk(err);
            }

            log.info("Stop instance success. instanceId = %s", id);
            cbk(null, null);
        });
    }

    //helper functions
    function getStackInstances(stackId, cbk){
        stack.describeInstances({ StackId: stackId }, function(err, data){
            if(err){
                log.error("getStackInstances failed ", err);
                return cbk(err);
            }

            if(!data.Instances || !data.Instances.length){
                log.warn("No instances found. stackId = %s", stackId);
                return cbk("No instances found");
            }

            log.info("getStackInstances success. Got %s instances, stackId = %s", data.Instances.length, stackId);
            cbk(null, data.Instances);
        });
    }
    function getStacks(cbk){
        stack.describeStacks(function(err, data){
            if(err){
                log.error("describeStacks error ", err);
                return cbk(err);
            }

            if(!data.Stacks || !data.Stacks.length){
                log.warn("No stacks found");
                return cbk("No stacks found");
            }

            log.info("Get %s stacks success", data.Stacks.length);
            cbk(null, data.Stacks);
        });
    }
};
