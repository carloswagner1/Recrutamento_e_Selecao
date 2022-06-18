package com.g5tech.api.builder;

import com.g5tech.api.dto.*;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.Inscricao;

import java.util.List;

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
        candidato.setRua(dto.getLogradouro());
        candidato.setBairro(dto.getBairro());
        candidato.setCidade(dto.getCidade());
        candidato.setEstado(dto.getEstado());
        candidato.setPais(dto.getPais());
        candidato.setArea(dto.getArea());
        candidato.setEmail(dto.getEmail());
        candidato.setGenero(dto.getGenero());
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
        dto.setGenero(candidato.getGenero());
        dto.setDataNascimento(candidato.getDataNascimento());

        return dto;
    }

    public static CandidatoCompletoDTO buildDTOCompleto(Candidato candidato, List<FormacaoAcademicaDTO> formacaoAcademicaDTOList, List<ExperienciaProfissionalDTO> experienciaProfissionaDTOlList) {

        CandidatoCompletoDTO dto = new CandidatoCompletoDTO();
        dto.setId(candidato.getId().toString());
        dto.setNome(candidato.getNome());
        dto.setCpf(candidato.getCpf());
        dto.setCelular(candidato.getCelular());
        dto.setEmail(candidato.getEmail());
        dto.setExperiencias(experienciaProfissionaDTOlList);
        dto.setFormacoes(formacaoAcademicaDTOList);

        return dto;
    }

    public static UsuarioCandidatoDTO buildUsuarioCandidatoDTO(Candidato candidato, String senha) {

        UsuarioCandidatoDTO dto = new UsuarioCandidatoDTO();

        dto.setNome(candidato.getNome());
        dto.setCpf(candidato.getCpf());
        dto.setCelular(candidato.getCelular());
        dto.setCep(candidato.getCep());
        dto.setLogradouro(candidato.getRua());
        dto.setBairro(candidato.getBairro());
        dto.setCidade(candidato.getCidade());
        dto.setEstado(candidato.getEstado());
        dto.setPais(candidato.getPais());
        dto.setArea((candidato.getArea()));
        dto.setGenero(candidato.getGenero());
        dto.setDataNascimento(candidato.getDataNascimento());
        dto.setEmail(candidato.getEmail());
        dto.setSenha(senha);

        return dto;
    }

    public static CandidatoResultadoDTO buildResultadoDTO(Candidato candidato, Inscricao inscricao) {
        return CandidatoResultadoDTO.builder()
                .id(candidato.getId().toString())
                .nome(candidato.getNome())
                .email(candidato.getEmail())
                .celular(candidato.getCelular())
                .notaTeste(inscricao.getPontuacaoTeste().toString())
                .dataEntrevista(inscricao.getDataEntrevista())
                .horaEntrevista(inscricao.getHorarioEntrevista())
                .situacao(inscricao.getStatus().getNome())
                .build();
    }
}
