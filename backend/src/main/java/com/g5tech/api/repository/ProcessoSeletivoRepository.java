package com.g5tech.api.repository;

import com.g5tech.api.dto.SolicitacaoResponseDTO;
import com.g5tech.api.model.ProcessoSeletivo;
import com.g5tech.api.model.SolicitacaoVaga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProcessoSeletivoRepository extends JpaRepository<ProcessoSeletivo, Long> {
    List<ProcessoSeletivo> findAllByAreaVaga(String areaVaga);

    Optional<ProcessoSeletivo> findBySolicitacaoVaga(SolicitacaoVaga solicitacao);
}
