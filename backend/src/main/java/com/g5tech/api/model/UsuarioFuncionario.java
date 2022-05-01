package com.g5tech.api.model;

import com.g5tech.api.model.indicator.Perfil;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * UsuarioFuncionario --- representa um usuario funcionário com acesso ao sistema.
 */

@Entity
@Table(name = "tb_usuario_funcionario")
@Getter
@Setter
public class UsuarioFuncionario {

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

    @OneToOne
    @JoinColumn(name = "id_departamento")
    private Departamento departamento;
}
