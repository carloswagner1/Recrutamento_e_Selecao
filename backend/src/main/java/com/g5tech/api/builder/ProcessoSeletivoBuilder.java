package com.g5tech.api.builder;

import com.g5tech.api.dto.ProcessoCompletoResponseDTO;
import com.g5tech.api.dto.ProcessoResponseDTO;
import com.g5tech.api.model.ProcessoSeletivo;

import java.util.List;
import java.util.stream.Collectors;

public class ProcessoSeletivoBuilder {

    public static List<ProcessoResponseDTO> buildDTOList(List<ProcessoSeletivo> processoSeletivoList) {
        return processoSeletivoList.stream()
                .map(ProcessoSeletivoBuilder::buildDTO)
                .collect(Collectors.toList());
    }

    private static ProcessoResponseDTO buildDTO(ProcessoSeletivo processoSeletivo) {

        ProcessoResponseDTO dto = new ProcessoResponseDTO();
        dto.setId(processoSeletivo.getId());
        dto.setCargo(processoSeletivo.getCargo().getNome());
        dto.setTipoVaga(processoSeletivo.getSolicitacaoVaga().getTipoContratacao());
        dto.setLocal(processoSeletivo.getSolicitacaoVaga().getLocal());

        return dto;
    }

    public static ProcessoCompletoResponseDTO buildDTOCompleto(ProcessoSeletivo processoSeletivo) {

        ProcessoCompletoResponseDTO dto = new ProcessoCompletoResponseDTO();
        dto.setCargo(processoSeletivo.getCargo().getNome());
        dto.setDescricaoCargo(processoSeletivo.getCargo().getDescricao());
        dto.setRequisitosDesejaveis(processoSeletivo.getSolicitacaoVaga().getRequisitosDesejaveis());

        return dto;
    }
}
