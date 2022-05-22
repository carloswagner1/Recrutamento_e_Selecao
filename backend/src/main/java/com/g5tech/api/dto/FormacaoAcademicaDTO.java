package com.g5tech.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class FormacaoAcademicaDTO {
    private Long id;
    private String tipoFormacao;
    private String curso;
    private String instituicao;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM")
    private Date dataIngresso;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM")
    private Date dataConclusao;
}
