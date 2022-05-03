package com.g5tech.api.builder;

import com.g5tech.api.dto.CandidatoDTO;
import com.g5tech.api.dto.UsuarioCandidatoDTO;
import com.g5tech.api.model.indicator.AreaVaga;
import com.g5tech.api.model.Candidato;

public class CandidatoBuilder {

    /**
     * Instancia um objeto Candidato a partir dos dados enviados dentro de um candidatoDTO
     *
     * @param dto DTO com os dados de um Candidato
     * @return Candidato
     */
    public static Candidato build(UsuarioCandidatoDTO dto) {

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
        candidato.setDataNascimento(dto.getDataNascimento());

        return candidato;
    }

    public static CandidatoDTO buildDTO(Candidato candidato) {

        CandidatoDTO dto = new CandidatoDTO();

        dto.setNome(candidato.getNome());
        dto.setCpf(candidato.getCpf());
        dto.setCelular(candidato.getCelular());
        dto.setCep(candidato.getCep());
        dto.setRua(candidato.getRua());
        dto.setBairro(candidato.getBairro());
        dto.setCidade(candidato.getCidade());
        dto.setEstado(candidato.getEstado());
        dto.setPais(candidato.getPais());
        dto.setArea((candidato.getArea()));
        dto.setEmail(candidato.getEmail());

        return dto;
    }
}
