package com.g5tech.api.service;

import com.g5tech.api.exception.InscricaoNotFoundException;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.Inscricao;
import com.g5tech.api.repository.InscricaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class InscricaoService {

    private final InscricaoRepository inscricaoRepository;

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
}
