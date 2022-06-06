package com.g5tech.api.service;

import com.g5tech.api.builder.CandidatoBuilder;
import com.g5tech.api.builder.ExperienciaProfissionalBuilder;
import com.g5tech.api.builder.FormacaoAcademicaBuilder;
import com.g5tech.api.builder.ProcessoSeletivoBuilder;
import com.g5tech.api.dto.*;
import com.g5tech.api.exception.ProcessoSeletivoNotFoundException;
import com.g5tech.api.model.*;
import com.g5tech.api.model.indicator.StatusIndicator;
import com.g5tech.api.repository.InscricaoRepository;
import com.g5tech.api.repository.ProcessoSeletivoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Log4j2
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
    private final FormacaoAcademicaService formacaoAcademicaService;
    private final ExperienciaProfissionalService experienciaProfissionalService;

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

    public List<ProcessoResponseDTO> getAllAbertosByDepartamento(Long funcionarioId) {

        List<SolicitacaoVaga> solicitacaoList = solicitacaoService.getAllByDepartamento(funcionarioId);

        return solicitacaoList.stream()
                .map(this::getBySolicitacaoVaga)
                .filter(Objects::nonNull)
                .filter(processoSeletivo -> !processoSeletivo.getStatus().getId().equals(StatusIndicator.CONCLUIDO.getId()))
                .map(ProcessoSeletivoBuilder::buildDTO)
                .collect(Collectors.toList());
    }

    public Long getStatusById(Long id) {
        ProcessoSeletivo processoSeletivo = this.getById(id);
        return processoSeletivo.getStatus().getId();
    }

    public void updateStatusById(Long id, String statusName) {

        if (isNull(statusName)) {
            return;
        }

        ProcessoSeletivo processoSeletivo = this.getById(id);

        Status status = statusService.getByName(statusName);

        processoSeletivo.setStatus(status);
        processoSeletivoRepository.save(processoSeletivo);
    }

    public List<CandidatoCompletoDTO> getCandidatosById(Long id) {

        ProcessoSeletivo processoSeletivo = this.getById(id);

        List<Inscricao> inscricoes = inscricaoRepository.findAllByProcessoSeletivo(processoSeletivo);

        return inscricoes.stream()
                .filter(Objects::nonNull)
                .map(inscricao -> {

                    Candidato candidato = inscricao.getCandidato();

                    List<FormacaoAcademica> formacaoAcademicaoList = formacaoAcademicaService.getAllByCandidato(candidato);
                    List<FormacaoAcademicaDTO> formacaoAcademicaoDTOList = FormacaoAcademicaBuilder.buildDTOList(formacaoAcademicaoList);

                    List<ExperienciaProfissional> experienciaProfissionalList = experienciaProfissionalService.getAllByCandidato(candidato);
                    List<ExperienciaProfissionalDTO> experienciaProfissionalDTOList = ExperienciaProfissionalBuilder.buildDTOList(experienciaProfissionalList);

                    return CandidatoBuilder.buildDTOCompleto(candidato, formacaoAcademicaoDTOList, experienciaProfissionalDTOList);
                })
                .collect(Collectors.toList());
    }
}
