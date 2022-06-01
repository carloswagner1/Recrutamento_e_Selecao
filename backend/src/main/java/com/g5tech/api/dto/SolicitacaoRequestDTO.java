package com.g5tech.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SolicitacaoRequestDTO {
    private String departamento;
    private String cargo;
    private String tipoVaga;
    private String localVaga;
    private String qtdVagas;
    private String requisitos;
    private String motivo;
}
