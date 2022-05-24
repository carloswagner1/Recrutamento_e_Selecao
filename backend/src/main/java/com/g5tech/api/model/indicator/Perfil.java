package com.g5tech.api.model.indicator;

public enum Perfil {

    FUNCIONARIO("funcionario"),
    GERENTE_DEPTO("gerente_departamento"),
    GERENTE_RH("gerente_rh"),
    ;

    private String value;

    Perfil(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
