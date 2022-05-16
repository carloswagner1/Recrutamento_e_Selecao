package com.g5tech.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CandidatoCompletoDTO {
    private String nome;
    private String celular;
    private String email;
    private List<ExperienciaProfissionalDTO> experiencias;
    private List<FormacaoAcademicaDTO> formacoes;
}
