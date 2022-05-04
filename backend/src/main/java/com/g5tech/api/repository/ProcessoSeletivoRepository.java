package com.g5tech.api.repository;

import com.g5tech.api.model.ProcessoSeletivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessoSeletivoRepository extends JpaRepository<ProcessoSeletivo, Long> {
    List<ProcessoSeletivo> findAllByAreaVaga(String areaVaga);
}
