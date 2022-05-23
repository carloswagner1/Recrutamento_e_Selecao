package com.g5tech.api.model.indicator;

public enum AreaVaga {

    TODAS           (1L, "Todas"),
    TI              (2L, "TI"),
    ADMINISTRATIVO  (3L, "Administrativo"),
    FINANCEIRO      (4L, "Financeiro"),
    HUMANO          (5L, "Humano"),
    JURIDICO        (6L, "Jurídico"),
    PRODUCAO        (7L, "Produção")
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

    public static AreaVaga getAreaVagaFromValue(Long areaVagaEscolhida) {

        for (AreaVaga areaVaga : AreaVaga.values()) {
            if (areaVaga.value.equals(areaVagaEscolhida)) {
                return areaVaga;
            }
        }

        return null;
    }
}
