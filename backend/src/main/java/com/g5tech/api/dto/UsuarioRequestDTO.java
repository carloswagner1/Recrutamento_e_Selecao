package com.g5tech.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioRequestDTO {
    private String email;
    private String senha;
    private String tipo;
}
