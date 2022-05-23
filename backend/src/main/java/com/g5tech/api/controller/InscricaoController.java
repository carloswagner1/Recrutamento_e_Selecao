package com.g5tech.api.controller;

import com.g5tech.api.dto.InscricaoRequestDTO;
import com.g5tech.api.service.InscricaoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/inscricoes")
public class InscricaoController {

    private final InscricaoService inscricaoService;

    @Operation(summary = "Busca o status da inscrição pelo seu id")
    @GetMapping("/{id}/status")
    public ResponseEntity<Long> getOne(@PathVariable Long id) {
        return new ResponseEntity<>(inscricaoService.getStatusById(id), HttpStatus.OK);
    }

    @Operation(summary = "Salva uma nova inscrição para um Candidato e Processo Seletivo")
    @PostMapping
    public ResponseEntity<Long> create(@RequestBody InscricaoRequestDTO dto) {
        return new ResponseEntity<>(inscricaoService.saveInscricao(dto), HttpStatus.OK);
    }

    @Operation(summary = "Deleta uma inscrição pelo seu id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {

        inscricaoService.delete(id);

        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.NO_CONTENT);
    }

}
