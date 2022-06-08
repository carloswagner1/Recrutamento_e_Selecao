package com.g5tech.api.builder;

import com.g5tech.api.dto.ProcessoRequestDTO;
import com.g5tech.api.dto.ProcessoCompletoResponseDTO;
import com.g5tech.api.dto.ProcessoResponseDTO;
import com.g5tech.api.model.*;

import java.util.List;
import java.util.stream.Collectors;

public class ProcessoSeletivoBuilder {

    public static List<ProcessoResponseDTO> buildDTOList(List<ProcessoSeletivo> processoSeletivoList) {
        return processoSeletivoList.stream()
                .map(ProcessoSeletivoBuilder::buildDTO)
                .collect(Collectors.toList());
    }

    public static ProcessoResponseDTO buildDTO(ProcessoSeletivo processoSeletivo) {

        ProcessoResponseDTO dto = new ProcessoResponseDTO();
        dto.setId(processoSeletivo.getId());
        dto.setCargo(processoSeletivo.getCargo().getNome());
        dto.setTipoVaga(processoSeletivo.getSolicitacaoVaga().getTipoContratacao());
        dto.setLocal(processoSeletivo.getSolicitacaoVaga().getLocal());
        dto.setDescricao(processoSeletivo.getCargo().getDescricao());
        dto.setDepartamento(processoSeletivo.getCargo().getDepartamento().getNome());
        dto.setTeste(processoSeletivo.getTeste());

        return dto;
    }

    public static ProcessoCompletoResponseDTO buildDTOCompleto(ProcessoSeletivo processoSeletivo) {

        return ProcessoCompletoResponseDTO.builder()
                .id(processoSeletivo.getId().toString())
                .departamento(processoSeletivo.getCargo().getDepartamento().getNome())
                .cargo(processoSeletivo.getCargo().getNome())
                .descricaoCargo(processoSeletivo.getCargo().getDescricao())
                .areaVaga(processoSeletivo.getAreaVaga())
                .tipoVaga(processoSeletivo.getSolicitacaoVaga().getTipoContratacao())
                .localVaga(processoSeletivo.getSolicitacaoVaga().getLocal())
                .qtdVagas(String.valueOf(processoSeletivo.getSolicitacaoVaga().getQuantidadeVagas()))
                .requisitosDesejaveis(processoSeletivo.getSolicitacaoVaga().getRequisitosDesejaveis())
                .teste(processoSeletivo.getTeste())
                .dataInicio(processoSeletivo.getDataInicio())
                .dataFinal(processoSeletivo.getDataFinal())
                .status(processoSeletivo.getStatus().getNome())
                .build();
    }

    public static ProcessoSeletivo build(
            Cargo cargo, SolicitacaoVaga solicitacaoVaga, Status status, ProcessoRequestDTO dto) {

        return ProcessoSeletivo.builder()
                .cargo(cargo)
                .dataInicio(dto.getDataInicio())
                .dataFinal(dto.getDataFinal())
                .status(status)
                .areaVaga(dto.getArea())
                .solicitacaoVaga(solicitacaoVaga)
                .teste(dto.getTeste())
                .build();


    }
}
