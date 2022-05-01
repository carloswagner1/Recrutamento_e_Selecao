package com.g5tech.api.model.indicator;

public enum TipoUsuario {

    CANDIDATO   ("candidato"),
    EMPRESA     ("empresa"),
    ;

    private String value;

    TipoUsuario(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
