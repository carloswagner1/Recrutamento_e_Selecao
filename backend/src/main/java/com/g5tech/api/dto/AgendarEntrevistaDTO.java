package com.g5tech.api.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class AgendarEntrevistaDTO {
    private String email;
    private String mensagem;
    private String dataEntrevista;
    private String horaEntrevista;
    private String linkEntrevista;
}
