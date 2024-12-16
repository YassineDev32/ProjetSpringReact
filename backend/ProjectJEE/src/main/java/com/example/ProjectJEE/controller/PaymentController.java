package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.Payment;
import com.example.ProjectJEE.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id " + id));
    }

    @PostMapping
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.addPayment(payment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment payment) {
        try {
            Payment updatedPayment = paymentService.updatePayment(id, payment);
            return ResponseEntity.ok(updatedPayment); // Return the updated payment with HTTP 200
        } catch (RuntimeException e) {
            // If the payment is not found, return HTTP 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
    }
}
