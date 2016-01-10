package com.myapp.testpaypal.web.rest.dto;

/**
 * Created by dassiorleando on 1/10/16.
 */
public class ConfirmPayDTO {

    private String paymentId;
    private String payerId;
    private String token;
    private String guid;

    public ConfirmPayDTO() {
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getPayerId() {
        return payerId;
    }

    public void setPayerId(String payerId) {
        this.payerId = payerId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    @Override
    public String toString() {
        return "ConfirmPayDTO{" +
                "paymentId='" + paymentId + '\'' +
                ", payerId='" + payerId + '\'' +
                ", token='" + token + '\'' +
                ", guid='" + guid + '\'' +
                '}';
    }
}
