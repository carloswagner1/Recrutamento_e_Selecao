package com.g5tech.api.controller;

import com.g5tech.api.dto.*;
import com.g5tech.api.service.SolicitacaoVagaService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/solicitacoes")
public class SolicitacaoVagaController {

    private final SolicitacaoVagaService solicitacaoVagaService;

    @Operation(summary = "Salva uma nova solicitação de vaga no sistema")
    @PostMapping
    public ResponseEntity<Boolean> create(@Valid @RequestBody SolicitacaoRequestDTO dto) {
        return new ResponseEntity<>(solicitacaoVagaService.create(dto), HttpStatus.CREATED);
    }

    @Operation(summary = "Busca solicitações abertas para um departamento")
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<List<SolicitacaoResponseDTO>> getAllByDepartamento(@PathVariable Long id) {
        return new ResponseEntity<>(solicitacaoVagaService.getAllByDTODepartamento(id), HttpStatus.OK);
    }

    @Operation(summary = "Busca solicitações em análise para um departamento")
    @GetMapping("/usuarios/{id}/aprovacao")
    public ResponseEntity<List<SolicitacaoResponseDTO>> getAllEmAnaliseByDepartamento(@PathVariable Long id) {
        return new ResponseEntity<>(solicitacaoVagaService.getAllEmAnaliseByDepartamento(id), HttpStatus.OK);
    }

    @Operation(summary = "Busca solicitações aprovadas para um departamento")
    @GetMapping("/usuarios/{id}/aprovadas")
    public ResponseEntity<List<SolicitacaoResponseDTO>> getAllAprovadasByDepartamento(@PathVariable Long id) {
        return new ResponseEntity<>(solicitacaoVagaService.getAllAprovadasByDepartamento(id), HttpStatus.OK);
    }

    @Operation(summary = "Aprova uma solicitação")
    @GetMapping("/{id}/aprovar")
    public ResponseEntity<Boolean> aprova(@PathVariable Long id) {
        return new ResponseEntity<>(solicitacaoVagaService.aprova(id), HttpStatus.OK);
    }

    @Operation(summary = "Aprova uma solicitação")
    @GetMapping("/{id}/reprovar")
    public ResponseEntity<Boolean> reprova(@PathVariable Long id) {
        return new ResponseEntity<>(solicitacaoVagaService.reprova(id), HttpStatus.OK);
    }
}
