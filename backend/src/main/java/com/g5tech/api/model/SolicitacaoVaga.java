package com.g5tech.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tb_solicitacao_vaga")
@Getter
@Setter
public class SolicitacaoVaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_cargo")
    private Cargo cargo;

    @Column(name = "justificativa")
    private String justificativa;

    @Column(name = "requisitos_desejaveis")
    private String requisitosDesejaveis;

    @Column(name = "quantidade_vagas")
    private int quantidadeVagas;

    @Column(name = "local")
    private String local;

    @Column(name = "tipo_contratacao")
    private String tipoContratacao;

    @Column(name = "status")
    private String status;
}
