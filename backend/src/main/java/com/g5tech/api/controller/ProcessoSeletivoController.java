package com.g5tech.api.controller;

import com.g5tech.api.dto.InscricaoResponseDTO;
import com.g5tech.api.dto.ProcessosResponseDTO;
import com.g5tech.api.service.ProcessoSeletivoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/processos")
public class ProcessoSeletivoController {

    private final ProcessoSeletivoService processoSeletivoService;

    @Operation(summary = "Busca lista de processos seletivos pelo id do candidato")
    @GetMapping("/candidatos/{id}")
    public ResponseEntity<List<ProcessosResponseDTO>> getProcessosByCandidatoId(@PathVariable Long id) {
        return new ResponseEntity<>(processoSeletivoService.getByAreaCandidato(id), HttpStatus.OK);
    }
}
