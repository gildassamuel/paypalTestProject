'use strict';

angular.module('testpaypalApp')
    .controller('MainController', function ($scope, Principal, $http) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.approuveIt = false;
            $scope.approveUrl = "";
            $scope.isAuthenticated = Principal.isAuthenticated;


        });

        $scope.by = function(){
            $http.get("/api/payment/pay").success(function(data) {
                console.log(data);
                $scope.approveUrl = data.approveUrl;

                if($scope.approveUrl && $scope.approveUrl !== "" && $scope.approveUrl !== "undefined"){
                    $scope.approuveIt = true;
                }
            });
        }

    });
