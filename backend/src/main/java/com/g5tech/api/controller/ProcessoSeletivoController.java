package com.g5tech.api.controller;

import com.g5tech.api.dto.*;
import com.g5tech.api.service.ProcessoSeletivoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/processos")
public class ProcessoSeletivoController {

    private final ProcessoSeletivoService processoSeletivoService;

    @Operation(summary = "Busca lista de processos seletivos pelo id do candidato")
    @GetMapping("/candidatos/{id}")
    public ResponseEntity<List<ProcessoResponseDTO>> getProcessosByCandidatoId(@PathVariable("id") Long candidatoId) {
        return new ResponseEntity<>(processoSeletivoService.getByAreaCandidato(candidatoId), HttpStatus.OK);
    }

    @Operation(summary = "Busca processo seletivo pelo id")
    @GetMapping("/{id}")
    public ResponseEntity<ProcessoCompletoResponseDTO> getById(@PathVariable Long id) {
        return new ResponseEntity<>(processoSeletivoService.getCompletoById(id), HttpStatus.OK);
    }

    @Operation(summary = "Busca dados dos candidatos isncritos para um processo seletivo pelo id")
    @GetMapping("/{id}/candidatos")
    public ResponseEntity<List<CandidatoCompletoDTO>> getCandidatosById(@PathVariable Long id) {
        return new ResponseEntity<>(processoSeletivoService.getCandidatosById(id), HttpStatus.OK);
    }

    @Operation(summary = "Agenda entrevista de um candidato pelo id do processo e id do candidato")
    @PostMapping("/{id}/candidatos/{candidatoId}")
    public ResponseEntity<Boolean> agendaEntrevista(
            @PathVariable Long id,
            @PathVariable Long candidatoId,
            @RequestBody AgendarEntrevistaDTO dto) {
        return new ResponseEntity<>(processoSeletivoService.agendaEntrevista(id, candidatoId, dto), HttpStatus.OK);
    }

    @Operation(summary = "Aprova um candidato pelo id do processo e id do candidato")
    @GetMapping("/{id}/candidatos/{candidatoId}/aprovar")
    public ResponseEntity<Boolean> aprovaCandidato(
            @PathVariable Long id,
            @PathVariable Long candidatoId) {
        return new ResponseEntity<>(processoSeletivoService.aprovaCandidato(id, candidatoId), HttpStatus.OK);
    }

    @Operation(summary = "Reprova um candidato pelo id do processo e id do candidato")
    @GetMapping("/{id}/candidatos/{candidatoId}/reprovar")
    public ResponseEntity<Boolean> reprovaCandidato(
            @PathVariable Long id,
            @PathVariable Long candidatoId) {
        return new ResponseEntity<>(processoSeletivoService.reprovaCandidato(id, candidatoId), HttpStatus.OK);
    }

    @Operation(summary = "Agenda entrevista de um candidato pelo id do processo e id do candidato")
    @GetMapping("/{id}/encerrar")
    public ResponseEntity<Boolean> encerraProcesso(
            @PathVariable Long id) {
        return new ResponseEntity<>(processoSeletivoService.encerraProcesso(id), HttpStatus.OK);
    }

    @Operation(summary = "Busca dados dos candidatos isncritos para um processo seletivo pelo id")
    @GetMapping("/{id}/candidatos/teste")
    public ResponseEntity<List<CandidatoCompletoDTO>> getCandidatosTesteById(@PathVariable Long id) {
        return new ResponseEntity<>(processoSeletivoService.getCandidatosTesteById(id), HttpStatus.OK);
    }

    @Operation(summary = "Busca dados dos candidatos isncritos para um processo seletivo pelo id")
    @GetMapping("/{id}/candidatos/ativos")
    public ResponseEntity<ResultadosDTO> getCandidatosAtivosById(@PathVariable Long id) {
        return new ResponseEntity<>(processoSeletivoService.getCandidatosAtivosById(id), HttpStatus.OK);
    }

    @Operation(summary = "Busca status de um processo seletivo pelo id")
    @GetMapping("/{id}/status")
    public ResponseEntity<Long> getStatusById(@PathVariable Long id) {
        return new ResponseEntity<>(processoSeletivoService.getStatusById(id), HttpStatus.OK);
    }

    @Operation(summary = "Busca status de um processo seletivo pelo id")
    @PutMapping("/{id}/status")
    public ResponseEntity<Boolean> updateStatusById(@PathVariable Long id, @RequestBody ProcessoRequestDTO dto) {
        processoSeletivoService.updateStatusById(id, dto.getStatus());
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    @Operation(summary = "Busca processos para um departamento")
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<List<ProcessoCompletoResponseDTO>> getAllProcessosByDepartamento(@PathVariable Long id) {
        return new ResponseEntity<>(processoSeletivoService.getAllByDepartamento(id), HttpStatus.OK);
    }

    @Operation(summary = "Busca processos em andamento para um departamento")
    @GetMapping("/usuarios/{id}/abertos")
    public ResponseEntity<List<ProcessoResponseDTO>> getAllProcessosAbertosByDepartamento(@PathVariable Long id) {
        return new ResponseEntity<>(processoSeletivoService.getAllAbertosByDepartamento(id), HttpStatus.OK);
    }

    @Operation(summary = "Altera status de um processo e suas inscrições e envia email para candidatos")
    @PostMapping("/{id}/teste")
    public ResponseEntity<Boolean> updateStatusToTeste(
            @PathVariable Long id,
            @RequestBody TesteDTO dto) {
        processoSeletivoService.updateStatusToTeste(id, dto);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    @Operation(summary = "Salva um novo processo seletivo no sistema")
    @PostMapping
    public ResponseEntity<Boolean> create(@Valid @RequestBody ProcessoRequestDTO dto) {
        return new ResponseEntity<>(processoSeletivoService.create(dto), HttpStatus.CREATED);
    }

    @Operation(summary = "Altera um processo seletivo no sistema")
    @PutMapping
    public ResponseEntity<Boolean> update(@Valid @RequestBody ProcessoRequestDTO dto) {
        return new ResponseEntity<>(processoSeletivoService.update(dto), HttpStatus.OK);
    }

    @Operation(summary = "Deleta um processo seletivo do sistema")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        processoSeletivoService.delete(id);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.NO_CONTENT);
    }

}
