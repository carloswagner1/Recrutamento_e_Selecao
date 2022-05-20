package com.g5tech.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.g5tech.api.dto.ProcessoCompletoResponseDTO;
import com.g5tech.api.dto.ProcessoResponseDTO;
import com.g5tech.api.dto.UsuarioCandidatoDTO;
import com.g5tech.api.service.ProcessoSeletivoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/processos")
public class ProcessoSeletivoController {

    private final ProcessoSeletivoService processoSeletivoService;

    @Operation(summary = "Busca lista de processos seletivos pelo id do candidato")
    @GetMapping("/candidatos/{id}")
    public ResponseEntity<List<ProcessoResponseDTO>> getProcessosByCandidatoId(@PathVariable("id") Long candidatoId) {
        return new ResponseEntity<>(processoSeletivoService.getByAreaCandidato(candidatoId), HttpStatus.OK);
    }

    @Operation(summary = "Busca processo seletivo pelo id")
    @GetMapping("/{id}")
    public ResponseEntity<ProcessoCompletoResponseDTO> getById(@PathVariable Long id) {
        return new ResponseEntity<>(processoSeletivoService.getCompletoById(id), HttpStatus.OK);
    }

//    @Operation(summary = "Cria um novo candidato no banco de dados")
//    @PostMapping
//    public ResponseEntity<List<ProcessoResponseDTO>> create(@Valid @RequestBody FiltroVagasDTO dto) {
//        return new ResponseEntity<>(processoSeletivoService.save(dto), HttpStatus.OK);
//    }

}
