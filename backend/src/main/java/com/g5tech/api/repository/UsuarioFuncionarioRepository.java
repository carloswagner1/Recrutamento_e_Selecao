package com.g5tech.api.repository;

import com.g5tech.api.model.UsuarioFuncionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioFuncionarioRepository extends JpaRepository<UsuarioFuncionario, Long> {
    Optional<UsuarioFuncionario> findByEmail(String email);
}
