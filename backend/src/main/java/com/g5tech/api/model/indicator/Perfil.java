package com.g5tech.api.model.indicator;

public enum Perfil {

    FUNCIONARIO(1L),
    GERENTE_DEPTO(2L),
    GERENTE_RH(3L),
    ;

    private Long value;

    Perfil(Long value) {
        this.value = value;
    }

    public Long getValue() {
        return value;
    }
}
