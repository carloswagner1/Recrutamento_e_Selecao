package com.g5tech.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CurriculoRequestDTO {
    private Long idCandidato;
    private List<ExperienciaProfissionalDTO> experiencias;
    private List<FormacaoAcademicaDTO> formacoes;
}
