'use strict';

angular.module('testpaypalApp')
    .controller('CustomerDetailController', function ($scope, $rootScope, $stateParams, entity, Customer) {
        $scope.customer = entity;
        $scope.load = function (id) {
            Customer.get({id: id}, function(result) {
                $scope.customer = result;
            });
        };
        var unsubscribe = $rootScope.$on('testpaypalApp:customerUpdate', function(event, result) {
            $scope.customer = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
