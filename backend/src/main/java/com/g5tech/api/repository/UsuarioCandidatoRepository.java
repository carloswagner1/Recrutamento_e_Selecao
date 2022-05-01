package com.g5tech.api.repository;

import com.g5tech.api.model.UsuarioCandidato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioCandidatoRepository extends JpaRepository<UsuarioCandidato, Long> {
    Optional<UsuarioCandidato> findByEmail(String email);
}
