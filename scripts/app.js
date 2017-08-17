/*global alert, angular, $ */
/*global console */
(function () {
    "use strict";
    var myApp = angular.module("myApp", []);

    //    function getColors($scope, products) {
    //        // find the product ID
    //        $scope.colors = [];
    //        $.each(products, function (index, value) {
    //            $.each(value.product_colors, function (i, color) {
    //                $scope.colors.push(color.hex_value);
    //            });
    //        });
    //        
    //
    //        console.log("Colors:" + $scope.colors);
    //    }

    function getData($scope, $http, productType) {
        $scope.loading = true;
        var baseUrl = "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=";

        $http.get(baseUrl + productType).then(function (result) {
            $scope.products = result.data;
            console.log($scope.products);
        }, function (error) {
            console.log(error.message);
        });

        $scope.loading = false;
    }
    
//    function createColorDivs($scope, colorValueArray){
//        $.each(colorValueArray, function (index, value) {
//            var colorDiv = "<div class="
//        })
//    }

    myApp.controller("userChoiceController", ["$scope", "$http", function ($scope, $http) {
        $scope.choice = "";
        $scope.loading = false;
        $scope.getChoice = function (userChoice) {
            getData($scope, $http, $scope.choice);
        };
    }]);

//    myApp.controller("colorController", ["$scope", function ($scope, product) {
//        $scope.colors = [];
//        $.each(product, function (index, value) {
//            $scope.colors.push(value.hex_value);
//        });
//        //        $.each ($scope.colors, function (index, value){
//        //            
//        //        });
//
//    }]);
}());