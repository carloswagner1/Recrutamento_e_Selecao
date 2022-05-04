package com.g5tech.api.service;

import com.g5tech.api.builder.ProcessoSeletivoBuilder;
import com.g5tech.api.dto.ProcessosResponseDTO;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.ProcessoSeletivo;
import com.g5tech.api.repository.ProcessoSeletivoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProcessoSeletivoService {

    private final CandidatoService candidatoService;
    private final ProcessoSeletivoRepository processoSeletivoRepository;

    public List<ProcessosResponseDTO> getByAreaCandidato(Long candidatoId) {

        Candidato candidato = candidatoService.getById(candidatoId);

        List<ProcessoSeletivo> processoSeletivoList = processoSeletivoRepository.findAllByAreaVaga(candidato.getArea());

        return ProcessoSeletivoBuilder.buildDTOList(processoSeletivoList);
    }
}
