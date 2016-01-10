package com.myapp.testpaypal.web.rest.dto;

import com.paypal.api.payments.Payment;

/**
 * Created by dassiorleando on 1/9/16.
 */
public class PaymentDTO {
    private String approveUrl;
    private Payment payment;

    public PaymentDTO() {
    }

    public String getApproveUrl() {
        return approveUrl;
    }

    public void setApproveUrl(String approveUrl) {
        this.approveUrl = approveUrl;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    @Override
    public String toString() {
        return "PaymentDTO{" +
                "approveUrl='" + approveUrl + '\'' +
                ", payment=" + payment +
                '}';
    }
}
