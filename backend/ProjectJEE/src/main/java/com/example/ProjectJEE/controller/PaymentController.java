package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.dto.PaymentDTO;
import com.example.ProjectJEE.dto.PaymentIntentDTO;
import com.example.ProjectJEE.dto.PaymentRequest;
import com.example.ProjectJEE.model.Payment;
import com.example.ProjectJEE.service.PaymentService;
import com.example.ProjectJEE.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private StripeService stripeService;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }


    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id " + id));
    }
    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<Payment> getPaymentByReservationId(@PathVariable Long reservationId) {
        try {
            Payment payment = paymentService.getPaymentByReservationId(reservationId);
            return ResponseEntity.ok(payment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/add")
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.addPayment(payment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody PaymentDTO payment) {
        try {
            Payment updatedPayment = paymentService.updatePayment(id, payment);
            return ResponseEntity.ok(updatedPayment); // Return the updated payment with HTTP 200
        } catch (RuntimeException e) {
            // If the payment is not found, return HTTP 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/create")
    public ResponseEntity<Object> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
        try {
            // Call the Stripe service to create a PaymentIntent
            PaymentIntent paymentIntent = stripeService.createPaymentIntent(paymentRequest.getAmount());

            // Map the PaymentIntent to a DTO
            PaymentIntentDTO paymentIntentDTO = new PaymentIntentDTO(
                    paymentIntent.getId(),
                    paymentIntent.getStatus(),
                    paymentIntent.getClientSecret()
            );

            // Return the DTO as JSON
            return ResponseEntity.ok(paymentIntentDTO);
        } catch (StripeException e) {
            // Handle any exceptions from Stripe
            return ResponseEntity.status(500).body("Error creating payment intent: " + e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
    }
}
