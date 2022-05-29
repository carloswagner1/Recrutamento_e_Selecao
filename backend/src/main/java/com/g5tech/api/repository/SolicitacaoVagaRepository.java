package com.g5tech.api.repository;

import com.g5tech.api.model.SolicitacaoVaga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitacaoVagaRepository extends JpaRepository<SolicitacaoVaga, Long> {
}
