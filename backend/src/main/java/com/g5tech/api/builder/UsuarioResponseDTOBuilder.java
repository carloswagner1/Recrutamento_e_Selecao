package com.g5tech.api.builder;

import com.g5tech.api.dto.UsuarioResponseDTO;

public class UsuarioResponseDTOBuilder {


    public static UsuarioResponseDTO build(Long id, String perfil) {
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(id);
        dto.setPerfil(perfil);
        return dto;
    }

}
