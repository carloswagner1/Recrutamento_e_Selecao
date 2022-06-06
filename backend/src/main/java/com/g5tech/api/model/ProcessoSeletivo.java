package com.g5tech.api.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    @ManyToOne
    @JoinColumn(name = "id_status")
    private Status status;

    @Column(name = "area")
    private String areaVaga;

    @OneToOne
    @JoinColumn(name = "id_solicitacao_vaga")
    private SolicitacaoVaga solicitacaoVaga;

    @Column(name = "tema_teste")
    private String teste;

}
