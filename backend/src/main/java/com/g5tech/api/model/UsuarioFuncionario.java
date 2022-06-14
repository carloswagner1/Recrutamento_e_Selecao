package com.g5tech.api.model;

import com.g5tech.api.model.indicator.Perfil;
import lombok.*;

import javax.persistence.*;

/**
 * UsuarioFuncionario --- representa um usuario funcionário com acesso ao sistema.
 */

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_usuario_funcionario")
@Getter
@Setter
public class UsuarioFuncionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "celular")
    private String celular;

    @Column(name = "email")
    private String email;

    @Column(name = "hash_senha")
    private String hashSenha;

    @Column(name = "perfil")
    private String perfil;

    @OneToOne
    @JoinColumn(name = "id_departamento")
    private Departamento departamento;
}
