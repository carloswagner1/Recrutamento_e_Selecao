package com.g5tech.api.repository;

import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.FormacaoAcademica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormacaoAcademicaRepository extends JpaRepository<FormacaoAcademica, Long> {
    List<FormacaoAcademica> findAllByCandidato(Candidato candidato);
}
