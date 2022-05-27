package com.g5tech.api.service;

import com.g5tech.api.builder.ExperienciaProfissionalBuilder;
import com.g5tech.api.dto.ExperienciaProfissionalDTO;
import com.g5tech.api.exception.CandidatoNotFoundException;
import com.g5tech.api.exception.ExperienciaProfissionalNotFoundException;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.ExperienciaProfissional;
import com.g5tech.api.repository.ExperienciaProfissionalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.util.Objects.nonNull;

@RequiredArgsConstructor
@Service
public class ExperienciaProfissionalService {

    private final ExperienciaProfissionalRepository experienciaProfissionalRepository;


    public void delete(Long id) {
        ExperienciaProfissional experienciaProfissional = this.getById(id);
        experienciaProfissionalRepository.delete(experienciaProfissional);
    }

    private ExperienciaProfissional getById(Long id) {

        Optional<ExperienciaProfissional> experienciaProfissionalOptional = experienciaProfissionalRepository.findById(id);

        if (!experienciaProfissionalOptional.isPresent()) {
            throw new ExperienciaProfissionalNotFoundException();
        }

        return experienciaProfissionalOptional.get();
    }

    public void deleAllExperienciasByCandidato(Candidato candidato) {
        List<ExperienciaProfissional> experienciaProfissionalList = experienciaProfissionalRepository.findAllByCandidato(candidato);
        experienciaProfissionalRepository.deleteAll(experienciaProfissionalList);
    }

    public List<ExperienciaProfissional> getAllByCandidato(Candidato candidato) {
        return experienciaProfissionalRepository.findAllByCandidato(candidato);
    }

    public void saveOrUpdateList(Candidato candidato, List<ExperienciaProfissionalDTO> experiencias) {

        experiencias
                .forEach(experienciaProfissionalDTO -> {
                    if (nonNull(experienciaProfissionalDTO.getId())) {
                        this.update(experienciaProfissionalDTO);
                    }
                    else {
                        this.save(candidato, experienciaProfissionalDTO);
                    }
                });
    }

    private void save(Candidato candidato, ExperienciaProfissionalDTO experienciaProfissionalDTO) {
        ExperienciaProfissional experienciaProfissional = ExperienciaProfissionalBuilder.build(candidato, experienciaProfissionalDTO);
        experienciaProfissionalRepository.save(experienciaProfissional);
    }

    private void update(ExperienciaProfissionalDTO dto) {

        ExperienciaProfissional experienciaProfissional = experienciaProfissionalRepository.getById(dto.getId());

        experienciaProfissional.setEmpresa(dto.getEmpresa());
        experienciaProfissional.setCargo(dto.getCargo());
        experienciaProfissional.setDataAdmissao(dto.getDataAdmissao());
        experienciaProfissional.setDataDesligamento(dto.getDataDesligamento());

        experienciaProfissionalRepository.save(experienciaProfissional);
    }

}
