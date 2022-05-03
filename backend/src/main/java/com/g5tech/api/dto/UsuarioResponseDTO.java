package com.g5tech.api.dto;

import com.g5tech.api.model.indicator.Perfil;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioResponseDTO {
    private Long id;
    private Long perfil;
}
