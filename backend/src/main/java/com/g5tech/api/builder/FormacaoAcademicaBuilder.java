package com.g5tech.api.builder;

import com.g5tech.api.dto.FormacaoAcademicaDTO;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.FormacaoAcademica;

import java.util.List;
import java.util.stream.Collectors;

public class FormacaoAcademicaBuilder {

    public static List<FormacaoAcademicaDTO> buildDTOList(List<FormacaoAcademica> formacaoAcademicaList) {
        return formacaoAcademicaList.stream()
                .map(FormacaoAcademicaBuilder::buildDTO)
                .collect(Collectors.toList());
    }

    private static FormacaoAcademicaDTO buildDTO(FormacaoAcademica formacaoAcademica) {

        FormacaoAcademicaDTO dto = new FormacaoAcademicaDTO();
        dto.setId(formacaoAcademica.getId());
        dto.setTipoFormacao(formacaoAcademica.getTipoFormacao());
        dto.setCurso(formacaoAcademica.getCurso());
        dto.setInstituicao(formacaoAcademica.getInstituicao());
        dto.setDataIngresso(formacaoAcademica.getDataIngresso());
        dto.setDataConclusao(formacaoAcademica.getDataConclusao());

        return dto;
    }

    public static FormacaoAcademica build(Candidato candidato, FormacaoAcademicaDTO dto) {

        FormacaoAcademica formacaoAcademica = new FormacaoAcademica();
        formacaoAcademica.setCandidato(candidato);
        formacaoAcademica.setInstituicao(dto.getInstituicao());
        formacaoAcademica.setCurso(dto.getCurso());
        formacaoAcademica.setTipoFormacao(dto.getTipoFormacao());
        formacaoAcademica.setDataIngresso(dto.getDataIngresso());
        formacaoAcademica.setDataConclusao(dto.getDataConclusao());

        return formacaoAcademica;
    }
}
