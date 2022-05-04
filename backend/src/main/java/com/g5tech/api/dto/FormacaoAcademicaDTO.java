package com.g5tech.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class FormacaoAcademicaDTO {
    private String tipoFormacao;
    private String curso;
    private String instituicao;
    private Date dataIngresso;
    private Date dataConclusao;
}
