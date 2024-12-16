package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.Contract;
import com.example.ProjectJEE.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @GetMapping
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

    @PostMapping
    public Contract addContract(@RequestBody Contract contract) {
        return contractService.addContract(contract);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contract> updateContract(@PathVariable Long id, @RequestBody Contract contract) {
        try {
            Contract updatedContract = contractService.updateContract(id, contract);
            return ResponseEntity.ok(updatedContract); // Return the updated contract with HTTP 200
        } catch (RuntimeException e) {
            // If the contract is not found, return HTTP 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public void deleteContract(@PathVariable Long id) {
        contractService.deleteContract(id);
    }
}
