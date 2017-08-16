/*global alert, angular */
/*global console */
var baseUrl = "http://makeup-api.herokuapp.com/api/v1/products.json";
var queryString = "?product_type=";
var myApp = angular.module("myApp", []);

myApp.controller("dataController", ["$scope", "$http", function ($scope, $http) {

    $http.get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick').then(function (result) {
        $scope.model = result.data;

    }, function (error) {
        console.log(error.message);
    });


}]);

myApp.controller("userChoice", function ($scope) {
    $scope.choice = "";
    $scope.setChoice = function (userChoice) {
        $scope.choice = userChoice;
        console.log($scope.choice);
    };
});