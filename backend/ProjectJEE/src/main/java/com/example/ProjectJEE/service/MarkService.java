package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Mark;
import com.example.ProjectJEE.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarkService {

    @Autowired
    private MarkRepository markRepository;

    public List<Mark> getAllMarks() {
        return markRepository.findAll();
    }

    public Mark addMark(Mark mark) {
        return markRepository.save(mark);
    }

    public Optional<Mark> getMarkById(Long id) {
        return markRepository.findById(id);
    }
}
