package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Payment;
import com.example.ProjectJEE.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    // Method to update a payment
    public Payment updatePayment(Long id, Payment updatedPayment) {
        Optional<Payment> existingPaymentOptional = paymentRepository.findById(id);
        if (existingPaymentOptional.isPresent()) {
            Payment existingPayment = existingPaymentOptional.get();
            // Update fields of the existing payment
            existingPayment.setAmount(updatedPayment.getAmount());
            existingPayment.setPaymentDate(updatedPayment.getPaymentDate());
            existingPayment.setMethod(updatedPayment.getMethod());
            // Save the updated payment to the repository
            return paymentRepository.save(existingPayment);
        } else {
            // If the payment doesn't exist, throw an exception or return null (customize this as needed)
            throw new RuntimeException("Payment not found with id " + id);
        }
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
