package com.g5tech.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.g5tech.api.builder.CandidatoBuilder;
import com.g5tech.api.builder.UsuarioBuilder;
import com.g5tech.api.dto.UsuarioCandidatoDTO;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.Usuario;
import com.g5tech.api.repository.CandidatoRepository;
import com.g5tech.api.repository.UsuarioRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class CandidatoService {

    ObjectMapper mapper = new ObjectMapper();

    private final CandidatoRepository candidatoRepository;
    private final UsuarioRepository usuarioRepository;

    public CandidatoService(CandidatoRepository candidatoRepository,
                            UsuarioRepository usuarioRepository) {
        this.candidatoRepository = candidatoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Long save(UsuarioCandidatoDTO dto) throws JsonProcessingException {

        log.info("CandidatoService save UserCandidatoDTO: {}", mapper.writeValueAsString(dto));

        Candidato candidatoSalvo = this.saveNewCandidato(dto);

        Usuario usuarioSalvo = this.saveNewUsuario(dto.getEmail(), dto.getHashSenha(), candidatoSalvo);

        log.info("CandidatoService save Candidato id: {}, Usuario id: {}", candidatoSalvo.getId(), usuarioSalvo.getId());

        return candidatoSalvo.getId();
    }

    private Candidato saveNewCandidato(UsuarioCandidatoDTO dto) {

        Candidato candidato = CandidatoBuilder.build(dto);

        return candidatoRepository.save(candidato);
    }

    private Usuario saveNewUsuario(String email, String hashSenha, Candidato candidato) {

        Usuario usuario = UsuarioBuilder.buildUsuarioCandidato(email, hashSenha, candidato);

        return usuarioRepository.save(usuario);
    }

}
