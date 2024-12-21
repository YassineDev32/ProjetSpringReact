package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.dto.InvoiceDTO;
import com.example.ProjectJEE.model.EnumInvoiceStatus;
import com.example.ProjectJEE.model.Invoice;
import com.example.ProjectJEE.model.Reservation;
import com.example.ProjectJEE.repository.ReservationRepository;
import com.example.ProjectJEE.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private ReservationRepository reservationRepository;

    @GetMapping("/")
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable Long id) {
        return invoiceService.getInvoiceById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id " + id));
    }

    @PostMapping("/add")
    public ResponseEntity<Invoice> addInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        try {
            // Create Invoice entity from DTO
            Invoice invoice = new Invoice();
            invoice.setStatus(EnumInvoiceStatus.valueOf(invoiceDTO.getStatus().toUpperCase()));
            invoice.setTotalAmount(invoiceDTO.getTotalAmount());
            // Check if reservation exists
            if (invoiceDTO.getReservationId() != null) {
                Optional<Reservation> reservation = reservationRepository.findById(invoiceDTO.getReservationId());
                if (reservation.isPresent()) {
                    invoice.setReservation(reservation.get());
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Reservation not found
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Reservation ID missing
            }
            Invoice createdInvoice = invoiceService.addInvoice(invoice);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdInvoice);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody InvoiceDTO invoiceDTO) {
        try {
            Invoice updatedInvoice = invoiceService.updateInvoice(id, invoiceDTO);
            return ResponseEntity.ok(updatedInvoice);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable Long id) {
        invoiceService.deleteInvoice(id);
    }
}
