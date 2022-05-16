package com.g5tech.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CandidatoDTO {
    private String nome;
    private String cpf;
    private String celular;
    private String cep;
    private String rua;
    private String bairro;
    private String cidade;
    private String estado;
    private String pais;
    private String area;
    private String email;
    private String genero;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date dataNascimento;
}
