package com.g5tech.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * Inscricao --- representa uma Inscricao no sistema.
 */

@Entity
@Table(name = "tb_inscricao")
@Getter
@Setter
public class Inscricao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_candidato")
    private Candidato candidato;

    @ManyToOne
    @JoinColumn(name = "id_processo_seletivo")
    private ProcessoSeletivo processoSeletivo;

    @Column(name = "data_criacao")
    private Date dataCriacao;

    @ManyToOne
    @JoinColumn(name = "id_status")
    private Status status;

    @Column(name = "pontuacao_teste")
    private Double pontuacaoTeste;

    @Column(name = "data_entrevista")
    private String dataEntrevista;

    @Column(name = "hora_entrevista")
    private String horarioEntrevista;
}
