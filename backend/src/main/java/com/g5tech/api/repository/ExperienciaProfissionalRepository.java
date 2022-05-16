package com.g5tech.api.repository;

import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.ExperienciaProfissional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienciaProfissionalRepository extends JpaRepository<ExperienciaProfissional, Long> {
    List<ExperienciaProfissional> findAllByCandidato(Candidato candidato);
}
