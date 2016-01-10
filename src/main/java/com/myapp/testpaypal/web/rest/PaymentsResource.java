package com.myapp.testpaypal.web.rest;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import com.codahale.metrics.annotation.Timed;
import com.myapp.testpaypal.web.rest.dto.ConfirmPayDTO;
import com.myapp.testpaypal.web.rest.dto.LoggerDTO;
import com.myapp.testpaypal.web.rest.dto.PaymentDTO;
import com.myapp.testpaypal.web.rest.util.GenerateAccessToken;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import com.paypal.base.rest.PayPalResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * @author dassiorleando
 * Controller for payements actions.
 */
@RestController
@RequestMapping("/api/payment")
public class PaymentsResource {

    private final Logger LOGGER = LoggerFactory.getLogger(PaymentsResource.class);

    @RequestMapping(value = "/confirm",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public Payment confirmPaySomething(@RequestBody ConfirmPayDTO confirmPayDTO) {
        LOGGER.info("Data to confirm Payment : {}", confirmPayDTO);

        InputStream is = PaymentsResource.class
                .getResourceAsStream("/sdk_config.properties");
        try {
            PayPalResource.initConfig(is);
        } catch (PayPalRESTException e) {
            LOGGER.error(e.getMessage());
        }

        Payment createdPayment = null;
        // ###AccessToken
        // Retrieve the access token from
        // OAuthTokenCredential by passing in
        // ClientID and ClientSecret
        APIContext apiContext = null;
        String accessToken = null;
        try {
            accessToken = GenerateAccessToken.getAccessToken();

            // ### Api Context
            // Pass in a `ApiContext` object to authenticate
            // the call and to send a unique request id
            // (that ensures idempotency). The SDK generates
            // a request id if you do not pass one explicitly.
            apiContext = new APIContext(accessToken);
            // Use this variant if you want to pass in a request id
            // that is meaningful in your application, ideally
            // a order id.
			/*
			 * String requestId = Long.toString(System.nanoTime(); APIContext
			 * apiContext = new APIContext(accessToken, requestId ));
			 */
        } catch (PayPalRESTException e) {
            LOGGER.error(e.getMessage());
            return null;
        }

        String payerId = confirmPayDTO.getPayerId();
        if (payerId != null) {
            Payment payment = new Payment();
            if (confirmPayDTO.getGuid() != null) {
                payment.setId(confirmPayDTO.getPaymentId());
            }
            PaymentExecution paymentExecution = new PaymentExecution();
            paymentExecution.setPayerId(payerId);
            try {
                createdPayment = payment.execute(apiContext, paymentExecution);
            } catch (PayPalRESTException e) {
                LOGGER.error(e.getMessage());
            }
        }

        return createdPayment;
    }

    @RequestMapping(value = "/pay",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public PaymentDTO paySomething(HttpServletRequest req) {
        PaymentDTO paymentDTO = new PaymentDTO();

        InputStream is = PaymentsResource.class
                .getResourceAsStream("/sdk_config.properties");
        try {
            PayPalResource.initConfig(is);
        } catch (PayPalRESTException e) {
            LOGGER.error(e.getMessage());
        }

        Payment createdPayment = null;
        // ###AccessToken
        // Retrieve the access token from
        // OAuthTokenCredential by passing in
        // ClientID and ClientSecret
        APIContext apiContext = null;
        String accessToken = null;
        try {
            accessToken = GenerateAccessToken.getAccessToken();

            // ### Api Context
            // Pass in a `ApiContext` object to authenticate
            // the call and to send a unique request id
            // (that ensures idempotency). The SDK generates
            // a request id if you do not pass one explicitly.
            apiContext = new APIContext(accessToken);
            // Use this variant if you want to pass in a request id
            // that is meaningful in your application, ideally
            // a order id.
			/*
			 * String requestId = Long.toString(System.nanoTime(); APIContext
			 * apiContext = new APIContext(accessToken, requestId ));
			 */
        } catch (PayPalRESTException e) {
            LOGGER.error(e.getMessage());
            return null;
        }

        // ###Details
        // Let's you specify details of a payment amount.
        Details details = new Details();
        details.setShipping("1");
        details.setSubtotal("5");
        details.setTax("1");

        // ###Amount
        // Let's you specify a payment amount.
        Amount amount = new Amount();
        amount.setCurrency("USD");
        // Total must be equal to sum of shipping, tax and subtotal.
        amount.setTotal("7");
        amount.setDetails(details);

        // ###Transaction
        // A transaction defines the contract of a
        // payment - what is the payment for and who
        // is fulfilling it. Transaction is created with
        // a `Payee` and `Amount` types
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction
            .setDescription("This is the payment transaction description.");

        // ### Items
        Item item = new Item();
        item.setName("By for CamNews and MFlashServices").setQuantity("1").setCurrency("USD").setPrice("5");
        ItemList itemList = new ItemList();
        List<Item> items = new ArrayList<Item>();
        items.add(item);
        itemList.setItems(items);

        transaction.setItemList(itemList);

        // The Payment creation API requires a list of
        // Transaction; add the created `Transaction`
        // to a List
        List<Transaction> transactions = new ArrayList<Transaction>();
        transactions.add(transaction);

        // ###Payer
        // A resource representing a Payer that funds a payment
        // Payment Method
        // as 'paypal'
        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        // ###Payment
        // A Payment Resource; create one using
        // the above types and intent as 'sale'
        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        // ###Redirect URLs
        RedirectUrls redirectUrls = new RedirectUrls();
        String guid = UUID.randomUUID().toString().replaceAll("-", "");

        redirectUrls.setCancelUrl(req.getScheme() + "://"
            + req.getServerName() + ":" + req.getServerPort()
            + req.getContextPath() + "#/payment/cancel?guid=" + guid);

        redirectUrls.setReturnUrl(req.getScheme() + "://"
            + req.getServerName() + ":" + req.getServerPort()
            + req.getContextPath() + "#/payment/return?guid=" + guid);

        payment.setRedirectUrls(redirectUrls);

        // Create a payment by posting to the APIService
        // using a valid AccessToken
        // The return object contains the status;
        try {
            createdPayment = payment.create(apiContext);
            paymentDTO.setPayment(createdPayment);
            LOGGER.info("Created payment with id = "
                + createdPayment.getId() + " and status = "
                + createdPayment.getState());
            // ###Payment Approval Url
            Iterator<Links> links = createdPayment.getLinks().iterator();
            while (links.hasNext()) {
                Links link = links.next();
                if (link.getRel().equalsIgnoreCase("approval_url")) {
                    paymentDTO.setApproveUrl(link.getHref());
                }
            }
        } catch (PayPalRESTException e) {
            LOGGER.error("error in payment : " + e.getMessage());
        }

        return paymentDTO;
    }

}
