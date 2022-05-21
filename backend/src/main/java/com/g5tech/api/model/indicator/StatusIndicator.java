package com.g5tech.api.model.indicator;

public enum StatusIndicator {
    INSCRICOES(1L, "Inscrições"),
    TESTE(2L, "Teste"),
    ENTREVISTA(3L, "Entrevista"),
    CONCLUIDO(4L, "Concluído"),
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
