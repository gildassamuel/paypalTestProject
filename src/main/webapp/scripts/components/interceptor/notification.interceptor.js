 'use strict';

angular.module('testpaypalApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-testpaypalApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-testpaypalApp-params')});
                }
                return response;
            }
        };
    });
