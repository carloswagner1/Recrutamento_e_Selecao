package com.g5tech.api.repository;

import com.g5tech.api.model.Cargo;
import com.g5tech.api.model.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long> {

    Optional<Cargo> findByNomeAndDepartamento(String nome, Departamento departamento);

    List<Cargo> findAllByDepartamento(Departamento departamento);
}
