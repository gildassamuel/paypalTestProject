'use strict';

angular.module('testpaypalApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('payment', {
                parent: 'site',
                url: '/payment',
                data: {
                    authorities: [],
                    pageTitle: 'Payement par Paypal'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/payment/payment.html',
                        controller: 'PaymentController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        return $translate.refresh();
                    }]
                }
            })
            .state('payment.return', {
                parent: 'payment',
                url: '/return?guid&paymentId&token&PayerID',
                data: {
                    authorities: [],
                    pageTitle: 'Retour du payement : Payement par Paypal'
                },
                views: {
                    'content@payment': {
                        templateUrl: 'scripts/app/main/payment/payment-return.html',
                        controller: 'PaymentReturnController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        return $translate.refresh();
                    }]
                }
            })
            .state('payment.cancel', {
                parent: 'payment',
                url: '/cancel?guid&paymentId&token&PayerID',
                data: {
                    authorities: [],
                    pageTitle: 'Retour du payement : Payement par Paypal'
                },
                views: {
                    'content@payment': {
                        templateUrl: 'scripts/app/main/payment/payment-cancel.html',
                        controller: 'PaymentCancelController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        return $translate.refresh();
                    }]
                }
            });
    });
