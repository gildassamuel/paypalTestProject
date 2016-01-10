'use strict';

angular.module('testpaypalApp')
    .controller('PaymentCancelController', function ($scope, $http, $stateParams) {

        console.log("payment id : " + $stateParams.id);

        $scope.by = function(){
            $http.post("/api/payment/pay").success(function(data) {
                console.log(data);
                $scope.approveUrl = data.approveUrl;
            });
        }

    });
