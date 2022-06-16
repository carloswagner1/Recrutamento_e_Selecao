package com.g5tech.api.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CandidatoResultadoDTO {
    private String id;
    private String nome;
    private String email;
    private String celular;
    private String notaTeste;
    private String dataEntrevista;
    private String horaEntrevista;
    private String situacao;
}
