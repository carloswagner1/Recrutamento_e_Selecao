package com.g5tech.api.service;

import com.g5tech.api.model.Status;
import com.g5tech.api.repository.StatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StatusService {

    private final StatusRepository statusRepository;

    public Status getById(Long id) {
        return statusRepository.findById(id).get();
    }

    public Status getByName(String nome) {
        return statusRepository.findByNome(nome);
    }
}
