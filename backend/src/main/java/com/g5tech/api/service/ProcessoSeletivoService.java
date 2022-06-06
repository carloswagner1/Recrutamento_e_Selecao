package com.g5tech.api.service;

import com.g5tech.api.builder.ProcessoSeletivoBuilder;
import com.g5tech.api.controller.ProcessoRequestDTO;
import com.g5tech.api.dto.ProcessoCompletoResponseDTO;
import com.g5tech.api.dto.ProcessoResponseDTO;
import com.g5tech.api.exception.ProcessoSeletivoNotFoundException;
import com.g5tech.api.model.*;
import com.g5tech.api.model.indicator.StatusIndicator;
import com.g5tech.api.repository.InscricaoRepository;
import com.g5tech.api.repository.ProcessoSeletivoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProcessoSeletivoService {

    private final CandidatoService candidatoService;
    private final ProcessoSeletivoRepository processoSeletivoRepository;
    private final SolicitacaoVagaService solicitacaoService;
    private final CargoService cargoService;
    private final StatusService statusService;
    private final DepartamentoService departamentoService;
    private final InscricaoRepository inscricaoRepository;
    private final EmailService emailService;

    public List<ProcessoResponseDTO> getByAreaCandidato(Long candidatoId) {

        Candidato candidato = candidatoService.getById(candidatoId);

        List<ProcessoSeletivo> processoSeletivoList = processoSeletivoRepository.findAllByAreaVaga(candidato.getArea());

        List<ProcessoSeletivo> processoSeletivosFiltrados =
                processoSeletivoList.stream()
                .filter(processoSeletivo -> processoSeletivo.getStatus().getId().equals(1L))
                .collect(Collectors.toList());

        return ProcessoSeletivoBuilder.buildDTOList(processoSeletivosFiltrados);
    }

    public ProcessoCompletoResponseDTO getCompletoById(Long id) {

        ProcessoSeletivo processoSeletivo = this.getById(id);

        return ProcessoSeletivoBuilder.buildDTOCompleto(processoSeletivo);
    }

    public ProcessoSeletivo getById(Long id) {

        Optional<ProcessoSeletivo> processoSeletivoOptional = processoSeletivoRepository.findById(id);

        if (!processoSeletivoOptional.isPresent()) {
            throw new ProcessoSeletivoNotFoundException();
        }

        return processoSeletivoOptional.get();
    }

    public List<ProcessoCompletoResponseDTO> getAllByDepartamento(Long funcionarioId) {

        List<SolicitacaoVaga> solicitacaoList = solicitacaoService.getAllByDepartamento(funcionarioId);

        return solicitacaoList.stream()
                .map(this::getBySolicitacaoVaga)
                .filter(Objects::nonNull)
                .map(ProcessoSeletivoBuilder::buildDTOCompleto)
                .sorted(Comparator.comparing(ProcessoCompletoResponseDTO::getId))
                .collect(Collectors.toList());
    }

    private ProcessoSeletivo getBySolicitacaoVaga(SolicitacaoVaga solicitacao) {
        Optional<ProcessoSeletivo> processoSeletivoOptional = processoSeletivoRepository.findBySolicitacaoVaga(solicitacao);

        if (!processoSeletivoOptional.isPresent()) {
            return null;
        }

        return processoSeletivoOptional.get();
    }

    public Boolean create(ProcessoRequestDTO dto) {

        Departamento departamento = departamentoService.getDepartamentoByName(dto.getNomeDepartamento());

        Cargo cargo = cargoService.getByName(dto.getNomeCargo(), departamento);

        SolicitacaoVaga solicitacaoVaga = solicitacaoService.getById(Long.valueOf(dto.getSolicitacaoId()));

        Status status = statusService.getById(StatusIndicator.INICIADO.getId());

        ProcessoSeletivo processoSeletivo = ProcessoSeletivoBuilder.build(
                cargo,
                solicitacaoVaga,
                status,
                dto
        );

        processoSeletivoRepository.save(processoSeletivo);

        solicitacaoService.updateToFinalizada(solicitacaoVaga);

        return Boolean.TRUE;
    }

    public Boolean update(ProcessoRequestDTO dto) {

        ProcessoSeletivo processoSeletivo = this.getById(Long.valueOf(dto.getId()));

        solicitacaoService.updateSolicicatao(processoSeletivo.getSolicitacaoVaga(), dto);

        processoSeletivo.setAreaVaga(dto.getArea());
        processoSeletivo.setTeste(dto.getTeste());
        processoSeletivo.setDataInicio(dto.getDataInicio());
        processoSeletivo.setDataFinal(dto.getDataFinal());

        processoSeletivoRepository.save(processoSeletivo);

        return Boolean.TRUE;
    }

    public void delete(Long id) {

        ProcessoSeletivo processoSeletivo = this.getById(id);

        List<Inscricao> inscricoes = inscricaoRepository.findAllByProcessoSeletivo(processoSeletivo);

        List<String> emailList = inscricoes.stream()
                .map(inscricao -> {
                    String email = inscricao.getCandidato().getEmail();
                    inscricaoRepository.delete(inscricao);
                    return email;
                })
                .collect(Collectors.toList());

        emailService.sendProcessoEncerrado(processoSeletivo.getCargo().getNome(), emailList);

        processoSeletivoRepository.delete(processoSeletivo);
    }
}
