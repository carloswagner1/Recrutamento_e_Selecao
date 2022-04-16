package com.g5tech.api.service;

import com.g5tech.api.dto.CandidatoDTO;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.repository.CandidatoRepository;
import org.springframework.stereotype.Service;

@Service
public class CandidatoService {

    private final CandidatoRepository candidatoRepository;

    public CandidatoService(CandidatoRepository candidatoRepository) {
        this.candidatoRepository = candidatoRepository;
    }

    public Long save(CandidatoDTO dto) {

        Candidato candidato = this.build(dto);

        Candidato candidatoSalvo = candidatoRepository.save(candidato);

        return candidatoSalvo.getId();
    }

    /**
     * Instancia um objeto Candidato a partir dos dados enviados dentro de um candidatoDTO
     *
     * @param dto DTO com os dados de um Candidato
     * @return Candidato
     */
    private Candidato build(CandidatoDTO dto) {
        Candidato candidato = new Candidato();

        candidato.setNome(dto.getNome());
        candidato.setCpf(dto.getCpf());
        candidato.setCelular(dto.getCelular());
        candidato.setCep(dto.getCep());
        candidato.setRua(dto.getRua());
        candidato.setBairro(dto.getBairro());
        candidato.setCidade(dto.getCidade());
        candidato.setEstado(dto.getEstado());
        candidato.setPais(dto.getPais());
        candidato.setArea(dto.getArea());
        candidato.setEmail(dto.getEmail());

        return candidato;
    }
}
