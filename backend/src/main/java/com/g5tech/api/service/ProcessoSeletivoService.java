package com.g5tech.api.service;

import com.g5tech.api.builder.ProcessoSeletivoBuilder;
import com.g5tech.api.dto.ProcessoCompletoResponseDTO;
import com.g5tech.api.dto.ProcessoResponseDTO;
import com.g5tech.api.exception.ProcessoSeletivoNotFoundException;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.ProcessoSeletivo;
import com.g5tech.api.repository.ProcessoSeletivoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProcessoSeletivoService {

    private final CandidatoService candidatoService;
    private final ProcessoSeletivoRepository processoSeletivoRepository;

    public List<ProcessoResponseDTO> getByAreaCandidato(Long candidatoId) {

        Candidato candidato = candidatoService.getById(candidatoId);

        List<ProcessoSeletivo> processoSeletivoList = processoSeletivoRepository.findAllByAreaVaga(candidato.getArea());

        List<ProcessoSeletivo> processoSeletivosFiltrados =
                processoSeletivoList.stream()
                .filter(processoSeletivo -> processoSeletivo.getStatus().getId().equals(1L))
                .collect(Collectors.toList());

        return ProcessoSeletivoBuilder.buildDTOList(processoSeletivosFiltrados);
    }

    public ProcessoCompletoResponseDTO getCompletoById(Long id) {

        ProcessoSeletivo processoSeletivo = this.getById(id);

        return ProcessoSeletivoBuilder.buildDTOCompleto(processoSeletivo);
    }

    public ProcessoSeletivo getById(Long id) {

        Optional<ProcessoSeletivo> processoSeletivoOptional = processoSeletivoRepository.findById(id);

        if (!processoSeletivoOptional.isPresent()) {
            throw new ProcessoSeletivoNotFoundException();
        }

        return processoSeletivoOptional.get();
    }
}
