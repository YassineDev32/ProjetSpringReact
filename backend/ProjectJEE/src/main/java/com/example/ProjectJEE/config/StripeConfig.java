package com.example.ProjectJEE.config;

import com.stripe.Stripe;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class StripeConfig {

    @PostConstruct
    public void init() {
        // Set the Stripe secret key here (replace with your actual secret key)
        Stripe.apiKey = "sk_test_51NTZcAQ9TKLySsRyUF3YSy9RukqbsywI8f3DLJnO7Umy2Ds9ZfLCFqQ1XXVWRIfh72I2XT1H42Qj2wVscqw5Befj00z6tgd9LE";
    }
}
