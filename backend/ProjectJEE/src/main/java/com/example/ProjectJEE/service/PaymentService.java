package com.example.ProjectJEE.service;

import com.example.ProjectJEE.dto.PaymentDTO;
import com.example.ProjectJEE.model.*;
import com.example.ProjectJEE.repository.ContractRepository;
import com.example.ProjectJEE.repository.InvoiceRepository;
import com.example.ProjectJEE.repository.PaymentRepository;
import com.example.ProjectJEE.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private PaymentRepository paymentRepository; // Injection du repository

    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private ContractRepository contractRepository;


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
    public Payment getPaymentByReservationId(Long reservationId) {
        return paymentRepository.findByReservationId(reservationId)
                .orElseThrow(() -> new RuntimeException("Payment not found for reservation id " + reservationId));
    }


    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
    // apres la verification du payement valide
    public Reservation processPayment(Long reservationId, EnumPaymentMethod method) {
        // Récupérer la réservation
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        // Vérifier que le statut est CONFIRMED
        if (reservation.getStatus() != EnumReservationStatus.CONFIRMED) {
            throw new IllegalStateException("Only CONFIRMED reservations can be paid.");
        }

        // Récupérer l'Invoice associée
        Invoice invoice = reservation.getInvoice();
        if (invoice == null) {
            throw new RuntimeException("No invoice associated with this reservation.");
        }

        // Créer un paiement
        Payment payment = new Payment();
        payment.setMethod(method);
        payment.setAmount(invoice.getTotalAmount());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setInvoice(invoice);
        paymentRepository.save(payment);

        // Créer un contrat
        Contract contract = new Contract();
        contract.setTerms("Obligations du Locataire\n");
        contract.setCreationDate(LocalDate.now());
        contract.setInvoice(invoice);
        contractRepository.save(contract);

        // Mettre à jour les statuts
        reservation.setStatus(EnumReservationStatus.COMPLETED);
        invoice.setStatus(EnumInvoiceStatus.PAID);

        // Sauvegarder la réservation mise à jour
        return reservationRepository.save(reservation);
    }
}
