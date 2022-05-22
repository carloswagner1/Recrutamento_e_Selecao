package com.g5tech.api.controller;


import com.g5tech.api.service.ExperienciaProfissionalService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/experiencias")
public class ExperienciaProfissionalController {

    private final ExperienciaProfissionalService experienciaProfissionalService;

    @Operation(summary = "Deleta uma experiência profissional pelo seu id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {

        experienciaProfissionalService.delete(id);

        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.NO_CONTENT);
    }

}
