package com.g5tech.api.builder;

import com.g5tech.api.dto.DepartamentoCargoDTO;
import com.g5tech.api.model.Cargo;
import com.g5tech.api.model.Departamento;

import java.util.List;
import java.util.stream.Collectors;

public class DepartamentoCargoDTOBuilder {

    public static DepartamentoCargoDTO build(Departamento departamento, List<Cargo> cargos) {
        return DepartamentoCargoDTO.builder()
                .departamento(departamento.getNome())
                .cargos(cargos.stream().map(cargo -> cargo.getNome()).collect(Collectors.toList()))
                .build();
    }

}
