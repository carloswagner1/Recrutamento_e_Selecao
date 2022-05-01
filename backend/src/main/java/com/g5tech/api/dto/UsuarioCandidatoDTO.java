package com.g5tech.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioCandidatoDTO {
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
    private String senha;
}
