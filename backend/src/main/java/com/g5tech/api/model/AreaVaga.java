package com.g5tech.api.model;

public enum AreaVaga {

    FINANCEIRO(1L, "Financeiro"),
    TI(2L, "Tecnologia"),
    ;

    private Long value;
    private String name;

    AreaVaga(Long value, String name) {
        this.value = value;
        this.name = name;
    }

    public Long getValue() {
        return value;
    }

    public String getName() {
        return name;
    }
}
