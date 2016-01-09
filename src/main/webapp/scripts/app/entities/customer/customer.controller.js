'use strict';

angular.module('testpaypalApp')
    .controller('CustomerController', function ($scope, Customer) {
        $scope.customers = [];
        $scope.loadAll = function() {
            Customer.query(function(result) {
               $scope.customers = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Customer.get({id: id}, function(result) {
                $scope.customer = result;
                $('#deleteCustomerConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Customer.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteCustomerConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.customer = {
                name: null,
                amount: null,
                surName: null,
                id: null
            };
        };
    });
