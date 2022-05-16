package com.g5tech.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ExperienciaProfissionalDTO {
    private String empresa;
    private String cargo;
    private String descricaoTarefas;
    private Date dataAdmissao;
    private Date dataDesligamento;
}
