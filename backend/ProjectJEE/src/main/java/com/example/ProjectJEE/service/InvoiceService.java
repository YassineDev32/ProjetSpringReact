package com.example.ProjectJEE.service;

import com.example.ProjectJEE.dto.InvoiceDTO;
import com.example.ProjectJEE.model.EnumInvoiceStatus;
import com.example.ProjectJEE.model.Invoice;
import com.example.ProjectJEE.model.Reservation;
import com.example.ProjectJEE.repository.InvoiceRepository;
import com.example.ProjectJEE.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    // Method to get an invoice by ID
    public Optional<Invoice> getInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }

    public Invoice addInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(Long id, InvoiceDTO invoiceDTO) {
        // Fetch the existing invoice from the repository
        Invoice existingInvoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        // Update the status if provided
        if (invoiceDTO.getStatus() != null) {
            try {
                EnumInvoiceStatus status = EnumInvoiceStatus.valueOf(invoiceDTO.getStatus().toUpperCase());
                existingInvoice.setStatus(status);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid status value: " + invoiceDTO.getStatus());
            }
        }

        // Update the total amount if it's valid
        if (invoiceDTO.getTotalAmount() > 0) {
            existingInvoice.setTotalAmount(invoiceDTO.getTotalAmount());
        }

        // Update the reservation if the ID is provided
        if (invoiceDTO.getReservationId() != null) {
            Reservation reservation = reservationRepository.findById(invoiceDTO.getReservationId())
                    .orElseThrow(() -> new RuntimeException("Reservation not found"));
            existingInvoice.setReservation(reservation);
        }

        // Save and return the updated invoice
        return invoiceRepository.save(existingInvoice);
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
    public Optional<Invoice> getInvoiceByReservationId(Long reservationId) {
        return invoiceRepository.findByReservationId(reservationId); // Assuming the repository has a method like this
    }

}
