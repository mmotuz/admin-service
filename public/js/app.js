var app = angular.module('admin',['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            controller  : 'mainController'
        })

        // route for the about page
        .when('/environments', {
            templateUrl : '../../environments.html',
            controller  : 'environmentsController'
        })
});

app.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('environmentsController', function($scope, $http) {
    $http.get('http://localhost:3000/environments').then(
        function(response){
            $scope.environments = response.data;
        },
        function(response){
            console.log("all bad ", response);
        }
    );
});