package com.g5tech.api.repository;

import com.g5tech.api.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long>  {
    Status findByNome(String nome);
}
