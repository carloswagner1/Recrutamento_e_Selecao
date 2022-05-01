package com.g5tech.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.g5tech.api.service.CandidatoService;
import com.g5tech.api.dto.UsuarioCandidatoDTO;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/candidatos")
public class CandidatoController {

    private final CandidatoService candidatoService;

    public CandidatoController(CandidatoService candidatoService) {
        this.candidatoService = candidatoService;
    }

    @Operation(summary = "Cria um novo candidato no banco de dados")
    @PostMapping
    public ResponseEntity<Long> create(@Valid @RequestBody UsuarioCandidatoDTO dto) throws JsonProcessingException {
        return new ResponseEntity<>(candidatoService.save(dto), HttpStatus.CREATED);
    }

}
