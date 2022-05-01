package com.g5tech.api.builder;

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
        candidato.setArea(AreaVaga.getAreaVagaFromName(dto.getArea()));
        candidato.setEmail(dto.getEmail());

        return candidato;
    }
}
