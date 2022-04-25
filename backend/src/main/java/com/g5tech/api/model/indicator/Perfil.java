package com.g5tech.api.model.indicator;

public enum Perfil {

    CANDIDATO(1L),
    FUNCIONARIO(2L),
    GERENTE_DEPTO(3L),
    GERENTE_RH(4L),
    ;

    private Long value;

    Perfil(Long value) {
        this.value = value;
    }

    public Long getValue() {
        return value;
    }
}
