package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.dto.PaymentDTO;
import com.example.ProjectJEE.model.EnumPaymentMethod;
import com.example.ProjectJEE.model.Invoice;
import com.example.ProjectJEE.model.Payment;
import com.example.ProjectJEE.repository.InvoiceRepository;
import com.example.ProjectJEE.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }


    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id " + id));
    }

    @PostMapping("/add")
    public ResponseEntity<Payment> addPayment(@RequestBody PaymentDTO paymentDTO) {
        try {
            Payment payment = new Payment();
            // Set method
            if (paymentDTO.getMethod() != null) {
                payment.setMethod(EnumPaymentMethod.valueOf(paymentDTO.getMethod().toUpperCase()));
            }
            payment.setAmount(paymentDTO.getAmount());
            payment.setPaymentDate(paymentDTO.getPaymentDate());

            // Set invoice if provided
            if (paymentDTO.getInvoiceId() != null) {
                Invoice invoice = invoiceRepository.findById(paymentDTO.getInvoiceId())
                        .orElseThrow(() -> new RuntimeException("Invoice not found"));
                payment.setInvoice(invoice);
            } else {
                return ResponseEntity.badRequest().build();
            }

            Payment createdPayment = paymentService.addPayment(payment);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPayment);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody PaymentDTO paymentDTO) {
        try {
            Payment updatedPayment = paymentService.updatePayment(id, paymentDTO);
            return ResponseEntity.ok(updatedPayment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
    }
}
