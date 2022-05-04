package com.g5tech.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProcessosResponseDTO {
    private Long id;
    private String cargo;
    private String tipoVaga;
    private String local;
}
