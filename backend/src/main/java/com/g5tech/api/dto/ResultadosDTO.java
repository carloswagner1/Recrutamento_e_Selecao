package com.g5tech.api.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ResultadosDTO {
    private List<CandidatoResultadoDTO> candidatosClassificados;
    private String maiorNota;
}
