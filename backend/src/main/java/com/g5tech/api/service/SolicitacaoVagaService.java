package com.g5tech.api.service;

import com.g5tech.api.builder.SolicitacaoResponseDTOBuilder;
import com.g5tech.api.builder.SolicitacaoVagaBuilder;
import com.g5tech.api.dto.SolicitacaoRequestDTO;
import com.g5tech.api.dto.SolicitacaoResponseDTO;
import com.g5tech.api.exception.CargoNotFoundException;
import com.g5tech.api.model.Cargo;
import com.g5tech.api.model.Departamento;
import com.g5tech.api.model.SolicitacaoVaga;
import com.g5tech.api.model.UsuarioFuncionario;
import com.g5tech.api.repository.CargoRepository;
import com.g5tech.api.repository.SolicitacaoVagaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SolicitacaoVagaService {

    private final SolicitacaoVagaRepository solicitacaoVagaRepository;
    private final CargoRepository cargoRepository;
    private final CargoService cargoService;
    private final DepartamentoService departamentoService;
    private final UsuarioService usuarioService;

    public Boolean create(SolicitacaoRequestDTO dto) {

        Departamento departamento = departamentoService.getDepartamentoByName(dto.getDepartamento());

        Cargo cargo = cargoService.getCargoByNameAndDepartamento(dto.getCargo(), departamento);
        SolicitacaoVaga solicitacaoVaga = SolicitacaoVagaBuilder.build(dto, cargo);
        solicitacaoVagaRepository.save(solicitacaoVaga);

        return Boolean.TRUE;
    }

    public List<SolicitacaoResponseDTO> getAllByDepartamento(Long funcionarioId) {

        UsuarioFuncionario usuario = usuarioService.getUsuarioFuncionarioById(funcionarioId);

        Departamento departamento = usuario.getDepartamento();

        List<Cargo> cargoList = cargoService.getByDepartamento(departamento);

        List<SolicitacaoVaga> solicitacaoVagaList = new ArrayList<>();

        for (Cargo cargo : cargoList) {
            solicitacaoVagaList.addAll(this.getAllByCargo(cargo));
        }

        return SolicitacaoResponseDTOBuilder.buildList(solicitacaoVagaList);
    }

    private List<SolicitacaoVaga> getAllByCargo(Cargo cargo) {
        return solicitacaoVagaRepository.findAllByCargo(cargo);
    }
}
