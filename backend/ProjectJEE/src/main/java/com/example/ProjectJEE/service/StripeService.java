package com.example.ProjectJEE.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    public PaymentIntent createPaymentIntent(long amount) throws StripeException {
        // Amount is in the smallest currency unit (e.g., cents for USD)
        PaymentIntent paymentIntent = PaymentIntent.create(
                new com.stripe.param.PaymentIntentCreateParams.Builder()
                        .setAmount(amount)
                        .setCurrency("mad") // You can change the currency
                        .build()
        );
        return paymentIntent;
    }
}
