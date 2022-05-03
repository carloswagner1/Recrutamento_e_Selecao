package com.g5tech.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tb_formacao_academica")
@Getter
@Setter
public class FormacaoAcademica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_candidato")
    private Candidato candidato;

    @Column(name = "tipo_formacao")
    private String tipoFormacao;

    @Column(name = "curso")
    private String curso;

    @Column(name = "instituicao")
    private String instituicao;

    @Column(name = "data_ingresso")
    private Date dataIngresso;

    @Column(name = "data_conclusao")
    private Date dataConclusao;
}
