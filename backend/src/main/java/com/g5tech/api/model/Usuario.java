package com.g5tech.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Usuario --- representa um usuario com acesso ao sistema.
 */

@Entity
@Table(name = "tb_usuario")
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "hash_senha")
    private String hashSenha;

    @Column(name = "perfil")
    private Perfil perfil;

    @Column(name = "id_candidato")
    private Candidato candidato;
}
