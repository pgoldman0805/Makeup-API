/*global alert, angular, $ */
/*global console */
(function () {
    "use strict";


    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    var myApp = angular.module("myApp", []);

    function getData($scope, $http, productType) {
        $scope.loading = true;
        var baseUrl = "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=";

        $http.get(baseUrl + productType).then(function (result) {
            $scope.products = result.data;
            console.log($scope.products);
            $scope.loading = false;
        }, function (error) {
            console.log(error.message);
            $scope.loading = false;
        });

        
    }

    myApp.controller("userChoiceController", ["$scope", "$http", function ($scope, $http) {
        $scope.choice = "";
        $scope.loading = false;
        $scope.getChoice = function (userChoice) {
            getData($scope, $http, $scope.choice);
        };
    }]);

//    myApp.controller("loaderController", function($scope){
//        
//    });
    myApp.controller("productDescController", function ($scope) {
        $scope.showDiv = !$scope.showDiv;
    });

    // CUSTOM FILTER TO TRANSFORM TEXT TO TITLE-CASE
    // e.g. "tHe QUIck BROWN fox" ==> "The Quick Brown Fox"
    myApp.filter('toTitleCase', function () {
        return function (input) {
            input = input || '';
            return input.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        };
    });

}());