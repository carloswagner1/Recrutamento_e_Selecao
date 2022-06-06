package com.g5tech.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Builder
@Getter
@Setter
public class ProcessoCompletoResponseDTO {
    private String id;
    private String departamento;
    private String cargo;
    private String descricaoCargo;
    private String areaVaga;
    private String tipoVaga;
    private String localVaga;
    private String qtdVagas;
    private String requisitosDesejaveis;
    private String teste;
    private Date dataInicio;
    private Date dataFinal;
    private String status;
}
