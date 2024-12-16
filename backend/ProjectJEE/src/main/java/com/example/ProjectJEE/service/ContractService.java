package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Contract;
import com.example.ProjectJEE.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

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
    public Contract updateContract(Long id, Contract updatedContract) {
        Optional<Contract> existingContractOptional = contractRepository.findById(id);
        // If the contract exists, update its fields
        if (existingContractOptional.isPresent()) {
            Contract existingContract = existingContractOptional.get();
            // Update the fields of the existing contract with values from the updated contract
            existingContract.setTerms(updatedContract.getTerms());
            existingContract.setCreationDate(updatedContract.getCreationDate());
            // Save the updated contract to the repository
            return contractRepository.save(existingContract);
        } else {
            // If the contract doesn't exist, throw an exception or return null (you can customize this part)
            throw new RuntimeException("Contract not found with id " + id);
        }
    }

    public void deleteContract(Long id) {
        contractRepository.deleteById(id);
    }
}
