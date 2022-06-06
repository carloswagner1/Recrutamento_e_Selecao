package com.g5tech.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ProcessoRequestDTO {
    private String id;
    private String nomeDepartamento;
    private String nomeCargo;
    private String area;
    private String teste;
    private Date dataInicio;
    private Date dataFinal;
    private String solicitacaoId;
    private String tipoVaga;
    private String localVaga;
    private String qtdvagas;
    private String requisitos;
    private String status;
}
