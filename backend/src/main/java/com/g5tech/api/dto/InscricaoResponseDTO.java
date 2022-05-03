package com.g5tech.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InscricaoResponseDTO {
    private Long id;
    private String cargo;
    private String tipoContratacao;
    private String local;
}
