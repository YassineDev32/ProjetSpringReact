package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Contract;
import com.example.ProjectJEE.dto.ContractDTO;
import com.example.ProjectJEE.model.Invoice;
import com.example.ProjectJEE.repository.ContractRepository;
import com.example.ProjectJEE.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    public Optional<Contract> getContractById(Long id) {
        return contractRepository.findById(id);
    }

    public Contract addContract(Contract contract) {
        return contractRepository.save(contract);
    }

    // Method to update a contract
    public Contract updateContract(Long id, ContractDTO contractDTO) {
        Optional<Contract> existingContractOpt = contractRepository.findById(id);

        if (existingContractOpt.isEmpty()) {
            // If contract is not found, return null (controller will handle the 404 response)
            return null;
        }
        // Get the existing contract
        Contract existingContract = existingContractOpt.get();
        // Update only the fields provided in the ContractDTO
        if (contractDTO.getTerms() != null) {
            existingContract.setTerms(contractDTO.getTerms());
        }
        if (contractDTO.getCreationDate() != null) {
            java.util.Date utilDate = contractDTO.getCreationDate();
            java.time.LocalDate localDate = utilDate.toInstant()
                    .atZone(java.time.ZoneId.systemDefault())
                    .toLocalDate();
            existingContract.setCreationDate(localDate);
        }

        if (contractDTO.getInvoiceId() != null) {
            Optional<Invoice> invoice = invoiceRepository.findById(contractDTO.getInvoiceId());
            if (invoice.isPresent()) {
                existingContract.setInvoice(invoice.get());
            }
        }
        // Save and return the updated contract
        return contractRepository.save(existingContract);
    }

    public void deleteContract(Long id) {
        contractRepository.deleteById(id);
    }
}
