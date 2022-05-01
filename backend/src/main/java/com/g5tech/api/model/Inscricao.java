package com.g5tech.api.model;

import com.g5tech.api.model.indicator.Situacao;
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

    @Column(name = "situacao")
    private Situacao situacao;
}
