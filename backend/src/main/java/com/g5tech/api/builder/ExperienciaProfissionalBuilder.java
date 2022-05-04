package com.g5tech.api.builder;

import com.g5tech.api.dto.ExperienciaProfissionalDTO;
import com.g5tech.api.model.ExperienciaProfissional;

import java.util.List;
import java.util.stream.Collectors;

public class ExperienciaProfissionalBuilder {

    public static List<ExperienciaProfissionalDTO> buildDTOList(List<ExperienciaProfissional> experienciaProfissionalList) {
        return experienciaProfissionalList.stream()
                .map(ExperienciaProfissionalBuilder::buildDTO)
                .collect(Collectors.toList());
    }

    private static ExperienciaProfissionalDTO buildDTO(ExperienciaProfissional experienciaProfissional) {

        ExperienciaProfissionalDTO dto = new ExperienciaProfissionalDTO();
        dto.setCargo(experienciaProfissional.getCargo());
        dto.setEmpresa(experienciaProfissional.getEmpresa());
        dto.setDescricaoTarefas(experienciaProfissional.getDescricaoTarefas());
        dto.setDataAdmissao(experienciaProfissional.getDataAdmissao());
        dto.setDataDesligamento(experienciaProfissional.getDataDesligamento());

        return dto;
    }
}
