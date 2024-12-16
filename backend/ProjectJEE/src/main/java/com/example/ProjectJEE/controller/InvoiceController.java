package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.Invoice;
import com.example.ProjectJEE.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable Long id) {
        return invoiceService.getInvoiceById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id " + id));
    }

    @PostMapping
    public Invoice addInvoice(@RequestBody Invoice invoice) {
        return invoiceService.addInvoice(invoice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody Invoice invoice) {
        try {
            Invoice updatedInvoice = invoiceService.updateInvoice(id, invoice);
            return ResponseEntity.ok(updatedInvoice); // Return the updated invoice with HTTP 200
        } catch (RuntimeException e) {
            // If the invoice is not found, return HTTP 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable Long id) {
        invoiceService.deleteInvoice(id);
    }
}
