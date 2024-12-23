package com.example.ProjectJEE.service;

import com.example.ProjectJEE.dto.PaymentDTO;
import com.example.ProjectJEE.model.EnumPaymentMethod;
import com.example.ProjectJEE.model.Invoice;
import com.example.ProjectJEE.model.Payment;
import com.example.ProjectJEE.repository.InvoiceRepository;
import com.example.ProjectJEE.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository; // Injection du repository

    @Autowired
    private InvoiceRepository invoiceRepository;


    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(Long id, PaymentDTO paymentDTO) {
        Payment existingPayment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id " + id));

        // Mettre à jour le montant si fourni
        if (paymentDTO.getAmount() != null) {
            existingPayment.setAmount(paymentDTO.getAmount());
        }

        // Mettre à jour la date de paiement si fournie
        if (paymentDTO.getPaymentDate() != null) {
            existingPayment.setPaymentDate(paymentDTO.getPaymentDate());
        }

        // Mettre à jour la méthode de paiement si fournie
        if (paymentDTO.getMethod() != null) {
            try {
                EnumPaymentMethod method = EnumPaymentMethod.valueOf(paymentDTO.getMethod().toUpperCase());
                existingPayment.setMethod(method);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid payment method: " + paymentDTO.getMethod());
            }
        }

        // Mettre à jour l'association avec une facture si fournie
        if (paymentDTO.getInvoiceId() != null) {
            Invoice invoice = invoiceRepository.findById(paymentDTO.getInvoiceId())
                    .orElseThrow(() -> new RuntimeException("Invoice not found with id " + paymentDTO.getInvoiceId()));
            existingPayment.setInvoice(invoice);
        }

        return paymentRepository.save(existingPayment);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
