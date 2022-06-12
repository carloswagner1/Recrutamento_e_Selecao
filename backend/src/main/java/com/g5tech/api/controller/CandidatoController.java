package com.g5tech.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.g5tech.api.dto.*;
import com.g5tech.api.service.CandidatoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/candidatos")
public class CandidatoController {

    private final CandidatoService candidatoService;

    @Operation(summary = "Cria um novo candidato no banco de dados")
    @PostMapping
    public ResponseEntity<Long> create(@Valid @RequestBody UsuarioCandidatoDTO dto) throws JsonProcessingException {
        return new ResponseEntity<>(candidatoService.save(dto), HttpStatus.CREATED);
    }

    @Operation(summary = "Atualiza currículo de um candidato")
    @PostMapping("/{id}/curriculo")
    public ResponseEntity<Boolean> updateCurriculo(@Valid @RequestBody CurriculoRequestDTO dto) {
        candidatoService.updateCurriculo(dto);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    @Operation(summary = "Busca um candidato pelo seu id")
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioCandidatoDTO> getOne(@PathVariable Long id) {
        return new ResponseEntity<>(candidatoService.getOne(id), HttpStatus.OK);
    }

    @Operation(summary = "Busca lista de inscrições pelo id do candidato")
    @GetMapping("/{id}/inscricoes")
    public ResponseEntity<List<InscricaoResponseDTO>> getIncricoesByCandidatoId(@PathVariable Long id) {
        return new ResponseEntity<>(candidatoService.getIncricoesByCandidatoId(id), HttpStatus.OK);
    }

    @Operation(summary = "Busca dados pessoais, experiencias e formação acadêmica pelo id do candidato")
    @GetMapping("/{id}/completo")
    public ResponseEntity<CandidatoCompletoDTO> getExperienciaFormacaoByCandidatoId(@PathVariable Long id) {
        return new ResponseEntity<>(candidatoService.getExperienciaFormacaoByCandidatoId(id), HttpStatus.OK);
    }

    @Operation(summary = "Modifica um candidato pelo seu id")
    @PostMapping("/{id}/update")
    public ResponseEntity<UsuarioCandidatoDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioCandidatoDTO dto) {

        return new ResponseEntity<>(candidatoService.update(id, dto), HttpStatus.OK);
    }

    @Operation(summary = "Altera situação do candidato pelo seu id")
    @PostMapping("/{id}/classificar")
    public ResponseEntity<Boolean> updateSituacao(
            @PathVariable Long id,
            @Valid @RequestBody CandidatoStatusDTO dto) {

        candidatoService.updateSituacao(id, dto);

        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    @Operation(summary = "Deleta um candidato pelo seu id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {

        candidatoService.delete(id);

        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.NO_CONTENT);
    }

}
