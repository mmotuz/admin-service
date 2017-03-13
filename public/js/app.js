var app = angular.module('admin',['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            controller  : 'mainController'
        })

        // route for the about page
        .when('/instances', {
            templateUrl : '../../instances.html',
            controller  : 'instancesController'
        })
});

app.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('instancesController', function($scope, $http) {
    $scope.startInstance = function(instanceId) {
        console.log("Starting instance ", instanceId);
        $http.post('http://localhost:3000/instance/start', {instanceId: instanceId}).then(
            function(response){
                console.log("Instance %s started success", instanceId);
            },
            function(response){
                console.log("Instance %s start failed", instanceId);
            }
        );
    };

    $scope.stopInstance = function(instanceId) {
        console.log("Stopping instance ", instanceId);
        $http.post('http://localhost:3000/instance/stop', {instanceId: instanceId}).then(
            function(response){
                console.log("Instance %s stopped success", instanceId);
            },
            function(response){
                console.log("Instance %s stop failed", instanceId);
            }
        );
    };

    $http.get('http://localhost:3000/instances').then(
        function(response){
            $scope.instances = response.data;
        },
        function(response){
            console.log("all bad ", response);
        }
    );
});