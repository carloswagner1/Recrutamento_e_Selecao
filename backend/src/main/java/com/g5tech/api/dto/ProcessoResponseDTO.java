package com.g5tech.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProcessoResponseDTO {
    private Long id;
    private String cargo;
    private String tipoVaga;
    private String local;
    private String descricao;
    private String departamento;
    private String teste;
}
