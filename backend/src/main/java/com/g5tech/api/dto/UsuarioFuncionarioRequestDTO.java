package com.g5tech.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioFuncionarioRequestDTO {
    private String nome;
    private String cpf;
    private String email;
    private String celular;
    private String perfil;
    private String departamento;
    private String senha;
}
