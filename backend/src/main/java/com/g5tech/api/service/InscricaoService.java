package com.g5tech.api.service;

import com.g5tech.api.builder.InscricaoBuilder;
import com.g5tech.api.dto.InscricaoRequestDTO;
import com.g5tech.api.exception.CandidatoAlreadyInscritoException;
import com.g5tech.api.exception.CandidatoNotFoundException;
import com.g5tech.api.exception.InscricaoNotFoundException;
import com.g5tech.api.exception.ProcessoSeletivoNotFoundException;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.Inscricao;
import com.g5tech.api.model.ProcessoSeletivo;
import com.g5tech.api.model.Status;
import com.g5tech.api.model.indicator.StatusIndicator;
import com.g5tech.api.repository.CandidatoRepository;
import com.g5tech.api.repository.InscricaoRepository;
import com.g5tech.api.repository.ProcessoSeletivoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class InscricaoService {

    private final InscricaoRepository inscricaoRepository;
    private final StatusService statusService;
    private final CandidatoRepository candidatoRepository;
    private final ProcessoSeletivoRepository processoSeletivoRepository;

    public List<Inscricao> getByCandidato(Candidato candidato) {
        return inscricaoRepository.findAllByCandidato(candidato);
    }

    public Long getStatusById(Long id) {

        Inscricao inscricao = this.getById(id);
        
        return inscricao.getStatus().getId();
    }

    private Inscricao getById(Long id) {

        Optional<Inscricao> inscricaoOptional = inscricaoRepository.findById(id);

        if (!inscricaoOptional.isPresent()) {
            throw new InscricaoNotFoundException();
        }

        return inscricaoOptional.get();
    }

    public void delete(Long id) {
        // checando se inscricao existe no banco
        Inscricao inscricao = this.getById(id);

        // Deletando
        inscricaoRepository.delete(inscricao);
    }

    public void deleteAllByCandidato(Candidato candidato) {
        List<Inscricao> inscricaoList = inscricaoRepository.findAllByCandidato(candidato);
        inscricaoRepository.deleteAllInBatch(inscricaoList);
    }

    public Long saveInscricao(InscricaoRequestDTO dto) {

        Candidato candidato = this.getCandidatoById(dto.getIdCandidato());

        ProcessoSeletivo processoSeletivo = this.getProcessoSeletivoById(dto.getIdProcesso());

        Optional<Inscricao> inscricaoOptional = inscricaoRepository.findByCandidatoAndProcessoSeletivo(candidato, processoSeletivo);

        if (inscricaoOptional.isPresent()) {
            throw new CandidatoAlreadyInscritoException();
        }

        Status status = statusService.getById(StatusIndicator.INICIADO.getId());

        Inscricao inscricao = InscricaoBuilder.build(candidato, processoSeletivo, status);

        return inscricaoRepository.save(inscricao).getId();
    }

    private ProcessoSeletivo getProcessoSeletivoById(Long idProcesso) {

        Optional<ProcessoSeletivo> processoSeletivoOptional = processoSeletivoRepository.findById(idProcesso);

        if (!processoSeletivoOptional.isPresent()) {
            throw new ProcessoSeletivoNotFoundException();
        }

        return processoSeletivoOptional.get();
    }

    private Candidato getCandidatoById(Long idCandidato) {

        Optional<Candidato> candidatoOptional = candidatoRepository.findById(idCandidato);

        if (!candidatoOptional.isPresent()) {
            throw  new CandidatoNotFoundException();
        }

        return candidatoOptional.get();
    }

    public Inscricao getByCandidatoAndProcesso(Candidato candidato, ProcessoSeletivo processoSeletivo) {

        Optional<Inscricao> inscricaoOptional = inscricaoRepository.findByCandidatoAndProcessoSeletivo(candidato, processoSeletivo);

        if (!inscricaoOptional.isPresent()) {
            throw new InscricaoNotFoundException();
        }

        return inscricaoOptional.get();
    }

    public void save(Inscricao inscricao) {
        inscricaoRepository.save(inscricao);
    }
}
