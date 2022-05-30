package com.g5tech.api.builder;

import com.g5tech.api.dto.SolicitacaoResponseDTO;
import com.g5tech.api.model.SolicitacaoVaga;

import java.util.List;
import java.util.stream.Collectors;

public class SolicitacaoResponseDTOBuilder {

    public static List<SolicitacaoResponseDTO> buildList(List<SolicitacaoVaga> solicitacaoVagaList) {
        return solicitacaoVagaList.stream()
                .map(solicitacaoVaga ->
                        SolicitacaoResponseDTO.builder()
                                .id(solicitacaoVaga.getId().toString())
                                .departamento(solicitacaoVaga.getCargo().getDepartamento().getNome())
                                .cargo(solicitacaoVaga.getCargo().getNome())
                                .tipoVaga(solicitacaoVaga.getTipoContratacao())
                                .localVaga(solicitacaoVaga.getLocal())
                                .qtdVagas(String.valueOf(solicitacaoVaga.getQuantidadeVagas()))
                                .requisitos(solicitacaoVaga.getRequisitosDesejaveis())
                                .motivo(solicitacaoVaga.getJustificativa())
                                .status(solicitacaoVaga.getStatus())
                                .build())
                .collect(Collectors.toList());
    }
}
