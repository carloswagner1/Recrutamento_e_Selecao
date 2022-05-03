package com.g5tech.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.g5tech.api.dto.CandidatoDTO;
import com.g5tech.api.dto.InscricaoResponseDTO;
import com.g5tech.api.service.CandidatoService;
import com.g5tech.api.dto.UsuarioCandidatoDTO;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

    @Operation(summary = "Busca um candidato pelo seu id")
    @GetMapping("/{id}")
    public ResponseEntity<CandidatoDTO> getOne(@PathVariable Long id) {
        return new ResponseEntity<>(candidatoService.getOne(id), HttpStatus.CREATED);
    }

    @Operation(summary = "Busca lista de inscrições pelo id do candidato")
    @GetMapping("/{id}/inscricoes")
    public ResponseEntity<List<InscricaoResponseDTO>> getIncricoesByCandidatoId(@PathVariable Long id) {
        return new ResponseEntity<>(candidatoService.getIncricoesByCandidatoId(id), HttpStatus.OK);
    }

    @Operation(summary = "Busca um candidato pelo seu id")
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioCandidatoDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioCandidatoDTO dto) {
        return new ResponseEntity<>(candidatoService.update(id, dto), HttpStatus.OK);
    }

    @Operation(summary = "Busca um candidato pelo seu id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {

        candidatoService.delete(id);

        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.NO_CONTENT);
    }

}
