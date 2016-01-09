'use strict';

angular.module('testpaypalApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


