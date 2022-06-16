package com.g5tech.api.model.indicator;

public enum StatusIndicator {
    INICIADO(1L, "Iniciado"),
    TESTE(2L, "Teste"),
    ENTREVISTA(3L, "Entrevista"),
    CONCLUIDO(4L, "Concluído"),
    REPROVADO_TESTE(5L, "Reprovado no Teste"),
    REPROVADO(6L, "Reprovado"),
    APROVADO(7L, "Aprovado"),
    ;

    private Long id;
    private String name;

    StatusIndicator(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }
}
