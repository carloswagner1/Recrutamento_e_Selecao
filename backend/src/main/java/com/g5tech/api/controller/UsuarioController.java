package com.g5tech.api.controller;

import com.g5tech.api.dto.*;
import com.g5tech.api.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Operation(summary = "Realiza login no sistema")
    @PostMapping("/login")
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

    @Operation(summary = "Busca usuarios funcionários cadastrados")
    @GetMapping
    public ResponseEntity<List<UsuarioFuncionarioResponseDTO>> buscaUsuarios() {
        return new ResponseEntity<>(usuarioService.buscaUsuariosFuncionarios(), HttpStatus.OK);
    }

    @Operation(summary = "Salva um usuário funcionário no sistema")
    @PostMapping
    public ResponseEntity<Long> create(@RequestBody UsuarioFuncionarioRequestDTO dto) {
        return new ResponseEntity<>(usuarioService.create(dto), HttpStatus.CREATED);
    }

    @Operation(summary = "Altera um usuário funcionário no sistema")
    @PutMapping("/{id}")
    public ResponseEntity<Boolean> update(@PathVariable Long id, @RequestBody UsuarioFuncionarioRequestDTO dto) {
        usuarioService.update(id, dto);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    @Operation(summary = "Deleta um usuário funcionário do sistema")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        usuarioService.delete(id);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.NO_CONTENT);
    }

}
