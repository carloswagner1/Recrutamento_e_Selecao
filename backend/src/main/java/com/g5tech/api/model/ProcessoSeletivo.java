package com.g5tech.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tb_processo_seletivo")
@Getter
@Setter
public class ProcessoSeletivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_cargo")
    private Cargo cargo;

    @Column(name = "data_inicio")
    private Date dataInicio;

    @Column(name = "data_final")
    private Date dataFinal;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_status")
    private Status status;

    @Column(name = "area")
    private String areaVaga;

    @ManyToOne
    @JoinColumn(name = "id_departamento")
    private Departamento departamento;

    @OneToOne
    @JoinColumn(name = "id_solicitacao_vaga")
    private SolicitacaoVaga solicitacaoVaga;

}
