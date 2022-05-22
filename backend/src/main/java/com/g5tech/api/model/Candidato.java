package com.g5tech.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * Candidato --- representa um candidato no sistema.
 */

@Entity
@Table(name = "tb_candidato")
@Getter
@Setter
public class Candidato {

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

    @Column(name = "cep")
    private String cep;

    @Column(name = "rua")
    private String rua;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "estado")
    private String estado;

    @Column(name = "pais")
    private String pais;

    @Column(name = "area")
    private String area;

    @Column(name = "genero")
    private String genero;

    @Column(name = "data_nascimento")
    private Date dataNascimento;

    @Column(name = "email")
    private String email;
}
