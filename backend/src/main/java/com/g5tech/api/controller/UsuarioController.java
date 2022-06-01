package com.g5tech.api.controller;

import com.g5tech.api.dto.DepartamentoCargoDTO;
import com.g5tech.api.dto.UsuarioRequestDTO;
import com.g5tech.api.dto.UsuarioRedefineSenhaDTO;
import com.g5tech.api.dto.UsuarioResponseDTO;
import com.g5tech.api.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Operation(summary = "Realiza login no sistema")
    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> realizaLogin(@Valid @RequestBody UsuarioRequestDTO dto) {
        return new ResponseEntity<>(usuarioService.realizarLogin(dto), HttpStatus.OK);
    }

    @Operation(summary = "Redefine senha")
    @PostMapping("/senhas")
    public ResponseEntity<Boolean> redefineSenha(@Valid @RequestBody UsuarioRedefineSenhaDTO dto) {

        usuarioService.redefinirSenha(dto);

        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    @Operation(summary = "Busca departamento de um usuário pelo seu id")
    @GetMapping("/{id}/departamento")
    public ResponseEntity<DepartamentoCargoDTO> buscaDepartamento(@PathVariable Long id) {
        return new ResponseEntity<>(usuarioService.buscaDepartamento(id), HttpStatus.OK);
    }

}
