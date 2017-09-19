/*global alert, angular, $ */
/*global console */
(function () {
    "use strict";


    //    function toTitleCase(str) {
    //        return str.replace(/\w\S*/g, function (txt) {
    //            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    //        });
    //    }

    var myApp = angular.module("myApp", []);

    function constructUrl(productType, productTags) {

        //TODO: FIGURE OUT URL ENCODING FOR BRANDS WITH ' ' IN THEM

        //process tags first
        var tagsQueryString = "";
        for (var i = 0; i < productTags.length; i++) {
            tagsQueryString += productTags[i].replace(/\s/g, "+");
            tagsQueryString += ",";
        }

        var baseUrl = "https://makeup-api.herokuapp.com/api/v1/products.json?product_type=";
        baseUrl += productType;
        baseUrl += "&product_tags=";
        baseUrl += tagsQueryString;
        baseUrl = encodeURI(baseUrl);
        
        console.log(baseUrl);
        return baseUrl;
    }

    function getData($scope, $http, productType, productTags) {
        $scope.dataLoaded = false;
        $scope.loading = true;


        $http.get(constructUrl(productType, productTags)).then(function (result) {
            $scope.products = result.data;
            console.log($scope.products);
            $scope.loading = false;
            $scope.dataLoaded = true;
        }, function (error) {
            console.log(error.message);
            $scope.loading = false;
        });


    }

    myApp.controller("userChoiceController", ["$scope", "$http", function ($scope, $http) {
        $scope.prodType = "";
        $scope.prodTags = [
            "canadian",
            "natural",
            "sugar free",
            "dairy free",
            "non-gmo",
            "vegan",
            "fair trade",
            "organic",
            "gluten free",
            "peanut free product"
        ];
        $scope.selectedTags = [];


        $scope.toggleTag = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };

        $scope.tagExists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.dataLoaded = false;
        $scope.getChoice = function (userProdType, userProdTags) {
            getData($scope, $http, $scope.prodType, $scope.selectedTags);
        };
    }]);


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