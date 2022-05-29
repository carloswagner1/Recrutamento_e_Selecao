package com.g5tech.api.service;

import com.g5tech.api.exception.DepartamentoNotFoundException;
import com.g5tech.api.model.Departamento;
import com.g5tech.api.repository.DepartamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class DepartamentoService {

    private final DepartamentoRepository departamentoRepository;

    public Departamento getDepartamentoByName(String nome) {
        Optional<Departamento> departamentoOptional = departamentoRepository.findByNome(nome);

        if (!departamentoOptional.isPresent()) {
            throw new DepartamentoNotFoundException();
        }

        return departamentoOptional.get();
    }
}
