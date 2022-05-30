package com.g5tech.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class SolicitacaoResponseDTO {
    private String id;
    private String departamento;
    private String cargo;
    private String tipoVaga;
    private String localVaga;
    private String qtdVagas;
    private String requisitos;
    private String motivo;
    private String status;
}
