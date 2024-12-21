package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.Contract;
import com.example.ProjectJEE.dto.ContractDTO;
import com.example.ProjectJEE.model.Invoice;
import com.example.ProjectJEE.repository.InvoiceRepository;
import com.example.ProjectJEE.service.ContractService;
import com.example.ProjectJEE.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @GetMapping("/")
    public List<Contract> getAllContracts() {
        return contractService.getAllContracts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable Long id) {
        Optional<Contract> contractOptional = contractService.getContractById(id);

        // Check if the contract is present and return it, otherwise return 404 Not Found
        return contractOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Contract> addContract(@RequestBody ContractDTO contractDTO) {
        try {
            // Create a new Contract entity using the data from ContractDTO
            Contract contract = new Contract();
            if (contractDTO.getCreationDate() != null) {
                LocalDate creationDate = contractDTO.getCreationDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate();
                contract.setCreationDate(creationDate);
            }
            contract.setTerms(contractDTO.getTerms());

            // Assuming you have a method to fetch Invoice by its ID
            Optional<Invoice> invoice = invoiceRepository.findById(contractDTO.getInvoiceId());
            if (invoice.isPresent()) {
                contract.setInvoice(invoice.get()); // Set the Invoice on the Contract
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Invoice not found
            }

            // Save the Contract entity
            Contract savedContract = contractService.addContract(contract);

            // Return a response with the saved contract
            return ResponseEntity.status(HttpStatus.CREATED).body(savedContract);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Contract> updateContract(@PathVariable Long id, @RequestBody ContractDTO contractDTO) {
        try {
            // Call the service to update only the given fields
            Contract updatedContract = contractService.updateContract(id, contractDTO);
            if (updatedContract == null) {
                // If the contract is not found, return HTTP 404 Not Found
                return ResponseEntity.notFound().build();
            }
            // Return the updated contract with HTTP 200 OK
            return ResponseEntity.ok(updatedContract);
        } catch (Exception e) {
            // Handle exceptions and return 500 Internal Server Error
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/{id}")
    public void deleteContract(@PathVariable Long id) {
        contractService.deleteContract(id);
    }
}
