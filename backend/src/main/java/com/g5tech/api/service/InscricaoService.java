package com.g5tech.api.service;

import com.g5tech.api.builder.InscricaoBuilder;
import com.g5tech.api.dto.InscricaoResponseDTO;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.Inscricao;
import com.g5tech.api.repository.InscricaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class InscricaoService {

    private final InscricaoRepository inscricaoRepository;

    public List<Inscricao> getByCandidato(Candidato candidato) {
        return inscricaoRepository.findAllByCandidato(candidato);
    }

}
