package com.g5tech.api.controller;

import com.g5tech.api.dto.InscricaoDTO;
import com.g5tech.api.service.InscricaoService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/inscricoes")
public class InscricaoController {

//    private InscricaoService inscricaoService;
//
//    @Operation(summary = "Busca lista de inscricoes para um candidato")
//    @GetMapping("/candidato/{id}")
//    public ResponseEntity<List<InscricaoDTO>> create(@PathVariable Long candidatoId) {
//        return new ResponseEntity<>(inscricaoService.getByCandidatoId(candidatoId), HttpStatus.OK);
//    }
}
