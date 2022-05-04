package com.g5tech.api.builder;

import com.g5tech.api.dto.ProcessosResponseDTO;
import com.g5tech.api.model.ProcessoSeletivo;

import java.util.List;
import java.util.stream.Collectors;

public class ProcessoSeletivoBuilder {

    public static List<ProcessosResponseDTO> buildDTOList(List<ProcessoSeletivo> processoSeletivoList) {
        return processoSeletivoList.stream()
                .map(ProcessoSeletivoBuilder::buildDTO)
                .collect(Collectors.toList());
    }

    private static ProcessosResponseDTO buildDTO(ProcessoSeletivo processoSeletivo) {

        ProcessosResponseDTO dto = new ProcessosResponseDTO();
        dto.setId(processoSeletivo.getId());
        dto.setCargo(processoSeletivo.getCargo().getNome());
        dto.setTipoVaga(processoSeletivo.getSolicitacaoVaga().getTipoContratacao());
        dto.setLocal(processoSeletivo.getSolicitacaoVaga().getLocal());

        return dto;
    }
}
