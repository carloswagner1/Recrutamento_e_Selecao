package com.g5tech.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * UsuarioCandidato --- representa um usuario candidato com acesso ao sistema.
 */

@Entity
@Table(name = "tb_usuario_candidato")
@Getter
@Setter
public class UsuarioCandidato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "hash_senha")
    private String hashSenha;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_candidato")
    private Candidato candidato;
}
