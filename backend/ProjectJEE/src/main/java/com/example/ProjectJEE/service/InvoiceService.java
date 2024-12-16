package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Invoice;
import com.example.ProjectJEE.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

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

    public Invoice updateInvoice(Long id, Invoice updatedInvoice) {
        Optional<Invoice> existingInvoiceOptional = invoiceRepository.findById(id);

        if (existingInvoiceOptional.isPresent()) {
            Invoice existingInvoice = existingInvoiceOptional.get();
            // Update fields of the existing invoice
            existingInvoice.setTotalAmount(updatedInvoice.getTotalAmount());
            existingInvoice.setStatus(updatedInvoice.getStatus());
            // Save the updated invoice to the repository
            return invoiceRepository.save(existingInvoice);
        } else {
            // If the invoice doesn't exist, throw an exception or return null (customize this as needed)
            throw new RuntimeException("Invoice not found with id " + id);
        }
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
}
