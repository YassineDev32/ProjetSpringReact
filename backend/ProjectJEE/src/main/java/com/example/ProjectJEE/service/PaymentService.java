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
        contract.setTerms("Obligations du Locataire\n" +
                "\n" +
                "Restituer le véhicule dans le même état qu'au moment de la prise en charge.\n" +
                "Respecter les limitations de kilométrage établies (maximum de 200 km/jour).\n" +
                "Informer immédiatement le propriétaire en cas d'accident, de dommage ou de panne mécanique.\n" +
                "Utiliser le véhicule uniquement pour des activités légales et en conformité avec le Code de la route.\n" +
                "Restrictions\n" +
                "\n" +
                "Fumer est strictement interdit dans le véhicule.\n" +
                "Il est interdit de transporter des substances dangereuses ou illégales.\n" +
                "Le véhicule ne peut être conduit que par les personnes désignées dans le contrat.\n" +
                "Toute conduite sous l'influence de drogues ou d'alcool est strictement interdite.\n" +
                "Assurance\n" +
                "\n" +
                "Le véhicule est couvert par une assurance tous risques.\n" +
                "Une franchise de 500 € s'applique en cas de dommages ou de vol.\n" +
                "L'assurance ne couvre pas les dommages causés par une utilisation négligente ou interdite du véhicule.\n" +
                "Retard et Résiliation\n" +
                "\n" +
                "Tout retard dans la restitution du véhicule entraînera des frais de 50 € par jour de retard.\n" +
                "En cas de non-respect des conditions, le contrat peut être résilié immédiatement sans remboursement.\n" +
                "Loi Applicable\n" +
                "\n" +
                "Ce contrat est régi par les lois en vigueur dans la juridiction du lieu de location.");
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
