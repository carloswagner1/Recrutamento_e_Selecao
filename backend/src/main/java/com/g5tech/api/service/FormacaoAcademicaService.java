package com.g5tech.api.service;

import com.g5tech.api.builder.ExperienciaProfissionalBuilder;
import com.g5tech.api.builder.FormacaoAcademicaBuilder;
import com.g5tech.api.dto.ExperienciaProfissionalDTO;
import com.g5tech.api.dto.FormacaoAcademicaDTO;
import com.g5tech.api.exception.ExperienciaProfissionalNotFoundException;
import com.g5tech.api.exception.FormacaoAcademicaNotFoundException;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.ExperienciaProfissional;
import com.g5tech.api.model.FormacaoAcademica;
import com.g5tech.api.repository.FormacaoAcademicaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.util.Objects.nonNull;

@RequiredArgsConstructor
@Service
public class FormacaoAcademicaService {

    private final FormacaoAcademicaRepository formacaoAcademicaRepository;


    public void delete(Long id) {
        FormacaoAcademica formacaoAcademica = this.getById(id);
        formacaoAcademicaRepository.delete(formacaoAcademica);
    }

    private FormacaoAcademica getById(Long id) {

        Optional<FormacaoAcademica> formacaoAcademicaOptional = formacaoAcademicaRepository.findById(id);

        if (!formacaoAcademicaOptional.isPresent()) {
            throw new FormacaoAcademicaNotFoundException();
        }

        return formacaoAcademicaOptional.get();
    }

    public void deleAllFormacoesByCandidato(Candidato candidato) {
        List<FormacaoAcademica> formacaoAcademicaList = formacaoAcademicaRepository.findAllByCandidato(candidato);
        formacaoAcademicaRepository.deleteAll(formacaoAcademicaList);
    }

    public List<FormacaoAcademica> getAllByCandidato(Candidato candidato) {
        return formacaoAcademicaRepository.findAllByCandidato(candidato);
    }

    public void saveOrUpdateList(Candidato candidato, List<FormacaoAcademicaDTO> formacoes) {

        formacoes
                .forEach(formacaoAcademicaDTO -> {
                    if (nonNull(formacaoAcademicaDTO.getId())) {
                        this.update(formacaoAcademicaDTO);
                    }
                    else {
                        this.save(candidato, formacaoAcademicaDTO);
                    }
                });
    }

    private void save(Candidato candidato, FormacaoAcademicaDTO formacaoAcademicaDTO) {
        FormacaoAcademica formacaoAcademica = FormacaoAcademicaBuilder.build(candidato, formacaoAcademicaDTO);
        formacaoAcademicaRepository.save(formacaoAcademica);
    }

    private void update(FormacaoAcademicaDTO dto) {

        FormacaoAcademica formacaoAcademica = formacaoAcademicaRepository.getById(dto.getId());

        formacaoAcademica.setInstituicao(dto.getInstituicao());
        formacaoAcademica.setCurso(dto.getCurso());
        formacaoAcademica.setTipoFormacao(dto.getTipoFormacao());
        formacaoAcademica.setDataIngresso(dto.getDataConclusao());
        formacaoAcademica.setDataConclusao(dto.getDataConclusao());

        formacaoAcademicaRepository.save(formacaoAcademica);
    }

}
