package com.g5tech.api.builder;

import com.g5tech.api.dto.SolicitacaoRequestDTO;
import com.g5tech.api.model.Cargo;
import com.g5tech.api.model.SolicitacaoVaga;

public class SolicitacaoVagaBuilder {

    public static SolicitacaoVaga build(SolicitacaoRequestDTO dto, Cargo cargo) {

        SolicitacaoVaga solicitacaoVaga = new SolicitacaoVaga();
        solicitacaoVaga.setCargo(cargo);
        solicitacaoVaga.setJustificativa(dto.getMotivo());
        solicitacaoVaga.setRequisitosDesejaveis(dto.getRequisitos());
        solicitacaoVaga.setQuantidadeVagas(new Integer(dto.getQtdVagas()));
        solicitacaoVaga.setLocal(dto.getLocalVaga());
        solicitacaoVaga.setTipoContratacao(dto.getTipoVaga());
        solicitacaoVaga.setStatus("Em Análise");

        return solicitacaoVaga;
    }
}
