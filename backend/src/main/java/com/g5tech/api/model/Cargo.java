package com.g5tech.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tb_cargo")
@Getter
@Setter
public class Cargo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_departamento")
    private Departamento departamento;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;
}
