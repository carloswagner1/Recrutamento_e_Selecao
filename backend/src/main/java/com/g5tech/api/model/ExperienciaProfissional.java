package com.g5tech.api.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tb_sexperiencia_profissional")
@Getter
@Setter
public class ExperienciaProfissional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "empresa")
    private String empresa;

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "descricao_tarefas")
    private String descricaoTarefas;

    @Column(name = "data_admissao")
    private Date dataAdmissao;

    @Column(name = "data_desligamento")
    private Date dataDesligamento;
}
