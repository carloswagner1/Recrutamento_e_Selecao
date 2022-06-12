package com.g5tech.api.service;

import com.g5tech.api.builder.SolicitacaoResponseDTOBuilder;
import com.g5tech.api.builder.SolicitacaoVagaBuilder;
import com.g5tech.api.dto.ProcessoRequestDTO;
import com.g5tech.api.dto.SolicitacaoRequestDTO;
import com.g5tech.api.dto.SolicitacaoResponseDTO;
import com.g5tech.api.exception.SolicitacaoVagaNotFoundException;
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
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SolicitacaoVagaService {

    private static final String STATUS_EM_ANALISE = "Em Análise";
    private static final String STATUS_APROVADA = "Aprovada";

    private final SolicitacaoVagaRepository solicitacaoVagaRepository;
    private final CargoRepository cargoRepository;
    private final CargoService cargoService;
    private final DepartamentoService departamentoService;
    private final UsuarioService usuarioService;

    public Boolean create(SolicitacaoRequestDTO dto) {

        Departamento departamento = departamentoService.getDepartamentoByName(dto.getDepartamento());

        Cargo cargo = cargoService.getCargoByNameAndDepartamento(dto.getCargo(), departamento);
        SolicitacaoVaga solicitacaoVaga = SolicitacaoVagaBuilder.build(dto, cargo);
        this.save(solicitacaoVaga);

        return Boolean.TRUE;
    }

    public List<SolicitacaoVaga> getAllByDepartamento(Long funcionarioId) {

        UsuarioFuncionario usuario = usuarioService.getUsuarioFuncionarioById(funcionarioId);

        Departamento departamento = usuario.getDepartamento();

        List<Cargo> cargoList = cargoService.getByDepartamento(departamento);

        List<SolicitacaoVaga> solicitacaoVagaList = new ArrayList<>();

        for (Cargo cargo : cargoList) {
            solicitacaoVagaList.addAll(this.getAllByCargo(cargo));
        }

        return solicitacaoVagaList;
    }

    public List<SolicitacaoResponseDTO> getAllByDTODepartamento(Long funcionarioId) {

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

    public List<SolicitacaoResponseDTO> getAllEmAnaliseByDepartamento(Long funcionarioId) {

        List<SolicitacaoResponseDTO> solicitacaoResponseDTOList = this.getAllByDTODepartamento(funcionarioId);

        return solicitacaoResponseDTOList.stream()
                .filter(dto -> dto.getStatus().equals(STATUS_EM_ANALISE))
                .collect(Collectors.toList());
    }

    public Boolean aprova(Long id) {
        SolicitacaoVaga solicitacaoVaga = this.getById(id);
        solicitacaoVaga.setStatus("Aprovada");
        this.save(solicitacaoVaga);
        return Boolean.TRUE;
    }

    public Boolean reprova(Long id) {
        SolicitacaoVaga solicitacaoVaga = this.getById(id);
        solicitacaoVaga.setStatus("Reprovada");
        this.save(solicitacaoVaga);
        return Boolean.TRUE;
    }

    private void save(SolicitacaoVaga solicitacaoVaga) {
        solicitacaoVagaRepository.save(solicitacaoVaga);
    }

    public SolicitacaoVaga getById(Long id) {
        Optional<SolicitacaoVaga> solicitacaoVagaOptional = solicitacaoVagaRepository.findById(id);

        if (!solicitacaoVagaOptional.isPresent()) {
            throw new SolicitacaoVagaNotFoundException();
        }

        return solicitacaoVagaOptional.get();
    }

    public List<SolicitacaoResponseDTO> getAllAprovadasByDepartamento(Long funcionarioId) {

        List<SolicitacaoResponseDTO> solicitacaoResponseDTOList = this.getAllByDTODepartamento(funcionarioId);

        return solicitacaoResponseDTOList.stream()
                .filter(dto -> dto.getStatus().equals(STATUS_APROVADA))
                .collect(Collectors.toList());
    }

    public void updateToFinalizada(SolicitacaoVaga solicitacaoVaga) {
        solicitacaoVaga.setStatus("Finalizada");
        solicitacaoVagaRepository.save(solicitacaoVaga);
    }

    public void updateSolicicatao(SolicitacaoVaga solicitacaoVaga, ProcessoRequestDTO dto) {

        solicitacaoVaga.setQuantidadeVagas(new Integer(dto.getQtdvagas()));
        solicitacaoVaga.setLocal(dto.getLocalVaga());
        solicitacaoVaga.setTipoContratacao(dto.getTipoVaga());
        solicitacaoVaga.setRequisitosDesejaveis(dto.getRequisitos());

        solicitacaoVagaRepository.save(solicitacaoVaga);
    }
}
