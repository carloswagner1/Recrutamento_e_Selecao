package com.g5tech.api.repository;

import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.Inscricao;
import com.g5tech.api.model.ProcessoSeletivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {
    List<Inscricao> findAllByCandidato(Candidato candidato);

    List<Inscricao> findAllByProcessoSeletivo(ProcessoSeletivo processoSeletivo);

    Optional<Inscricao> findByCandidatoAndProcessoSeletivo(Candidato candidato, ProcessoSeletivo processoSeletivo);
}
