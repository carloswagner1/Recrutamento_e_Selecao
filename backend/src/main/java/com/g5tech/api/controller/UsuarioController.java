package com.g5tech.api.controller;

import com.g5tech.api.dto.UsuarioDTO;
import com.g5tech.api.dto.UsuarioRedefineSenhaDTO;
import com.g5tech.api.exception.ValidateException;
import com.g5tech.api.service.UsuarioService;
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
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Operation(summary = "Redefine senha")
    @PostMapping
    public ResponseEntity<Boolean> redefiniSenha(@Valid @RequestBody UsuarioRedefineSenhaDTO dto) throws ValidateException {

        usuarioService.redefinirSenha(dto.getEmail());

        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

}
