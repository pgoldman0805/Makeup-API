/*global alert, angular */
/*global console */
(function () {
    "use strict";
    var myApp;
    myApp = angular.module("myApp", []);
    
    function getData($scope, $http, productType) {
        $scope.loading = true;
        var baseUrl;
        baseUrl = "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=";

        $http.get(baseUrl + productType).then(function (result) {
            $scope.products = result.data;
            $scope.loading = false;
        }, function (error) {
            console.log(error.message);
            $scope.loading = false;
        });
    }

    myApp.controller("userChoice", ["$scope", "$http", function ($scope, $http) {
        $scope.choice = "";
        $scope.loading = false;
        $scope.setChoice = function (userChoice) {
            getData($scope, $http, $scope.choice);
        };
    }]);
}());