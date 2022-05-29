package com.g5tech.api.controller;

import com.g5tech.api.dto.SolicitacaoRequestDTO;
import com.g5tech.api.dto.UsuarioRequestDTO;
import com.g5tech.api.dto.UsuarioResponseDTO;
import com.g5tech.api.service.SolicitacaoVagaService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/solicitacoes")
public class SolicitacaoVagaController {

    private final SolicitacaoVagaService solicitacaoVagaService;

    @Operation(summary = "Salva uma nova solicitação de vaga no sistema")
    @PostMapping
    public ResponseEntity<Boolean> create(@Valid @RequestBody SolicitacaoRequestDTO dto) {
        return new ResponseEntity<>(solicitacaoVagaService.create(dto), HttpStatus.OK);
    }
}
