'use strict';

angular.module('testpaypalApp')
    .controller('PaymentReturnController', function ($scope, $http, $stateParams) {

        $scope.data = {};
        var dataToSend = {};
        $scope.confirmIt = false;

        console.log("Payment id : " + $stateParams.paymentId);
        console.log("Payer id : " + $stateParams.PayerID);
        console.log("Guid : " + $stateParams.guid);
        console.log("Token : " + $stateParams.token);

        dataToSend.paymentId = $stateParams.paymentId;
        dataToSend.payerId = $stateParams.PayerID;
        dataToSend.guid = $stateParams.guid;
        dataToSend.token = $stateParams.token;

        console.log(dataToSend);

        function confirm(param){
            $http.post("/api/payment/confirm", param).success(function(data) {
                console.log(data);
                $scope.data = data;

                 if($scope.data && $scope.data !== "undefined"){
                    $scope.confirmIt = true;
                }
            });
        };

        confirm(dataToSend);


        /* $scope.fakeData = { "id": "PAY-0VB39475TK6171904K2IZ5WI", "intent": "sale", "payer": { "paymentMethod": "paypal", "status": null, "accountType": null, "accountAge": null, "fundingInstruments": null, "fundingOptionId": null, "fundingOption": null, "relatedFundingOption": null, "payerInfo": { "email": "dassi_merchant@paypal.fr", "externalRememberMeId": null, "accountNumber": null, "salutation": null, "firstName": "dassi", "middleName": null, "lastName": "merchant", "suffix": null, "payerId": "MPY6J5ZHL6SQN", "phone": "0458274046", "phoneType": null, "birthDate": null, "taxId": null, "taxIdType": null, "countryCode": "FR", "billingAddress": null, "shippingAddress": { "line1": "Av. de la Pelouse, 87648672 Mayet", "line2": null, "city": "Paris", "countryCode": "FR", "postalCode": "75002", "state": "Alsace", "normalizationStatus": null, "status": null, "phone": null, "id": null, "recipientName": "dassi merchant", "defaultAddress": null } } }, "potentialPayerInfo": null, "payee": null, "cart": "8S9124711E490971U", "transactions": [ { "referenceId": null, "amount": { "currency": "USD", "total": "7.00", "details": { "shipping": "1.00", "subtotal": "5.00", "tax": "1.00", "fee": null, "handlingFee": null, "giftWrap": null, "insurance": null, "shippingDiscount": null } }, "payee": null, "description": "This is the payment transaction description.", "noteToPayee": null, "custom": null, "invoiceNumber": null, "softDescriptor": null, "softDescriptorCity": null, "paymentOptions": null, "itemList": { "items": [ { "sku": null, "name": "By for CamNews and MFlashServices", "description": null, "quantity": "1", "price": "5.00", "currency": "USD", "tax": null, "url": null, "category": null, "weight": null, "length": null, "height": null, "width": null, "supplementaryData": null, "postbackData": null } ], "shippingAddress": { "line1": "Av. de la Pelouse, 87648672 Mayet", "line2": null, "city": "Paris", "countryCode": "FR", "postalCode": "75002", "state": "Alsace", "normalizationStatus": null, "status": null, "phone": null, "id": null, "recipientName": null, "defaultAddress": null }, "shippingMethod": null, "shippingPhoneNumber": null }, "notifyUrl": null, "orderUrl": null, "externalFunding": null, "relatedResources": [ { "sale": { "id": "0FA33985BB8193445", "purchaseUnitReferenceId": null, "amount": { "currency": "USD", "total": "7.00", "details": { "shipping": "1.00", "subtotal": "5.00", "tax": "1.00", "fee": null, "handlingFee": null, "giftWrap": null, "insurance": null, "shippingDiscount": null } }, "paymentMode": "INSTANT_TRANSFER", "state": "pending", "reasonCode": "RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION", "protectionEligibility": "ELIGIBLE", "protectionEligibilityType": "ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE", "clearingTime": null, "paymentHoldStatus": null, "paymentHoldReasons": null, "transactionFee": null, "receivableAmount": null, "exchangeRate": null, "fmfDetails": null, "receiptId": null, "parentPayment": "PAY-0VB39475TK6171904K2IZ5WI", "processorResponse": null, "billingAgreementId": null, "createTime": "2016-01-10T00:00:55Z", "updateTime": "2016-01-10T00:00:55Z", "links": [ { "href": "https://api.sandbox.paypal.com/v1/payments/sale/0FA33985BB8193445", "rel": "self", "targetSchema": null, "method": "GET", "enctype": null, "schema": null }, { "href": "https://api.sandbox.paypal.com/v1/payments/sale/0FA33985BB8193445/refund", "rel": "refund", "targetSchema": null, "method": "POST", "enctype": null, "schema": null }, { "href": "https://api.sandbox.paypal.com/v1/payments/payment/PAY-0VB39475TK6171904K2IZ5WI", "rel": "parent_payment", "targetSchema": null, "method": "GET", "enctype": null, "schema": null } ] }, "authorization": null, "capture": null, "refund": null, "order": null } ], "purchaseUnitReferenceId": null, "transactions": [] } ], "failedTransactions": null, "billingAgreementTokens": null, "creditFinancingOffered": null, "paymentInstruction": null, "state": "approved", "experienceProfileId": null, "noteToPayer": null, "redirectUrls": null, "failureReason": null, "createTime": "2016-01-10T00:00:55Z", "updateTime": null, "links": [ { "href": "https://api.sandbox.paypal.com/v1/payments/payment/PAY-0VB39475TK6171904K2IZ5WI", "rel": "self", "targetSchema": null, "method": "GET", "enctype": null, "schema": null } ] } ;
        console.log($scope.fakeData); */

    });
