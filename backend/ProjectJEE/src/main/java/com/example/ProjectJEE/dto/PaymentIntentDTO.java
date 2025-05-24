package com.example.ProjectJEE.dto;

public class PaymentIntentDTO {

    private String id;
    private String status;
    private String clientSecret;

    // Constructor
    public PaymentIntentDTO(String id, String status, String clientSecret) {
        this.id = id;
        this.status = status;
        this.clientSecret = clientSecret;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }
}

