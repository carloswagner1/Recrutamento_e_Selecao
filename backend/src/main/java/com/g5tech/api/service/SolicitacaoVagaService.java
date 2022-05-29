package com.g5tech.api.service;

import com.g5tech.api.builder.SolicitacaoVagaBuilder;
import com.g5tech.api.dto.SolicitacaoRequestDTO;
import com.g5tech.api.exception.CargoNotFoundException;
import com.g5tech.api.model.Cargo;
import com.g5tech.api.model.Departamento;
import com.g5tech.api.model.SolicitacaoVaga;
import com.g5tech.api.repository.CargoRepository;
import com.g5tech.api.repository.SolicitacaoVagaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SolicitacaoVagaService {

    private final SolicitacaoVagaRepository solicitacaoVagaRepository;
    private final CargoRepository cargoRepository;
    private final CargoService cargoService;
    private final DepartamentoService departamentoService;

    public Boolean create(SolicitacaoRequestDTO dto) {

        Departamento departamento = departamentoService.getDepartamentoByName(dto.getDepartamento());

        Cargo cargo = cargoService.getCargoByNameAndDepartamento(dto.getCargo(), departamento);
        SolicitacaoVaga solicitacaoVaga = SolicitacaoVagaBuilder.build(dto, cargo);
        solicitacaoVagaRepository.save(solicitacaoVaga);

        return Boolean.TRUE;
    }

}
