package com.g5tech.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class DepartamentoCargoDTO {
    private String departamento;
    private List<String> cargos;
}
