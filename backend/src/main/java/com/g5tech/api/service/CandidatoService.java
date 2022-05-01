package com.g5tech.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.g5tech.api.builder.CandidatoBuilder;
import com.g5tech.api.dto.CandidatoDTO;
import com.g5tech.api.dto.UsuarioCandidatoDTO;
import com.g5tech.api.exception.CandidatoCpfNotUniqueException;
import com.g5tech.api.exception.CandidatoEmailNotUniqueException;
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

        this.checkFields(dto);

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

    private void checkFields(UsuarioCandidatoDTO dto) {

        this.checkByEmail(dto.getEmail());
        this.checkByCpf(dto.getCpf());
    }

    private void checkByEmail(String email) {

        Optional<Candidato> candidatoOptional = candidatoRepository.findByEmail(email);

        if (candidatoOptional.isPresent()) {
            throw new CandidatoEmailNotUniqueException();
        }
    }

    private void checkByCpf(String cpf) {
        Optional<Candidato> candidatoOptional = candidatoRepository.findByCpf(cpf);

        if (candidatoOptional.isPresent()) {
            throw new CandidatoCpfNotUniqueException();
        }
    }

    private Candidato saveNewCandidato(UsuarioCandidatoDTO dto) {

        Candidato candidato = CandidatoBuilder.build(dto);

        return candidatoRepository.save(candidato);
    }

    public CandidatoDTO getOne(Long id) {

        Candidato candidato = this.getById(id);

        return CandidatoBuilder.buildDTO(candidato);
    }

    private Candidato getById(Long id) {

        Optional<Candidato> candidatoOptional = candidatoRepository.findById(id);

        if (!candidatoOptional.isPresent()) {
            throw  new CandidatoNotFoundException();
        }

        return candidatoOptional.get();
    }
}
