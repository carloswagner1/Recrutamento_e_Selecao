package com.g5tech.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UsuarioFuncionarioResponseDTO {
    private String id;
    private String nome;
    private String cpf;
    private String email;
    private String celular;
    private String perfil;
    private String departamento;
}
