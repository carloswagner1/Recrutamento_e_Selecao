package com.g5tech.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.g5tech.api.builder.CandidatoBuilder;
import com.g5tech.api.dto.UsuarioCandidatoDTO;
import com.g5tech.api.exception.CandidatoNotFoundException;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.UsuarioCandidato;
import com.g5tech.api.repository.CandidatoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.jasypt.util.text.StrongTextEncryptor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
@Service
public class CandidatoService {

    private final ObjectMapper mapper;
    private final CandidatoRepository candidatoRepository;
    private final UsuarioService usuarioService;
    private final StrongTextEncryptor strongTextEncryptor;

    public Long save(UsuarioCandidatoDTO dto) throws JsonProcessingException {

        log.info("CandidatoService save UserCandidatoDTO: {}", mapper.writeValueAsString(dto));

        Candidato candidatoSalvo = this.saveNewCandidato(dto);

        UsuarioCandidato usuarioCandidatoSalvo = usuarioService.saveNewUsuario(
                dto.getEmail(),
                strongTextEncryptor.encrypt(dto.getSenha()),
                candidatoSalvo
        );

        log.info("CandidatoService save Candidato id: {}, Usuario id: {}", candidatoSalvo.getId(), usuarioCandidatoSalvo.getId());

        return candidatoSalvo.getId();
    }

    private Candidato saveNewCandidato(UsuarioCandidatoDTO dto) {

        Candidato candidato = CandidatoBuilder.build(dto);

        return candidatoRepository.save(candidato);
    }

}
