package com.g5tech.api.model.indicator;

public enum AreaVaga {

    TI          (1L, "ti"),
    COMERCIAL   (2L, "comercial"),
    JURIDICO    (3L, "juridico"),
    FINANCEIRO  (4L, "financeiro"),
    TODAS       (5L, "todas")
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

    public static AreaVaga getAreaVagaFromName(String areaVagaEscolhida) {
        for (AreaVaga areaVaga : AreaVaga.values()) {
            if (areaVaga.name.equalsIgnoreCase(areaVagaEscolhida)) {
                return areaVaga;
            }
        }

        return null;
    }
}
