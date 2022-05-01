package com.g5tech.api.service;

import com.g5tech.api.builder.UsuarioBuilder;
import com.g5tech.api.builder.UsuarioResponseDTOBuilder;
import com.g5tech.api.dto.UsuarioRedefineSenhaDTO;
import com.g5tech.api.dto.UsuarioRequestDTO;
import com.g5tech.api.dto.UsuarioResponseDTO;
import com.g5tech.api.exception.CandidatoNotFoundException;
import com.g5tech.api.exception.SenhaInvalidaException;
import com.g5tech.api.exception.UsuarioNotFoundException;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.UsuarioCandidato;
import com.g5tech.api.model.UsuarioFuncionario;
import com.g5tech.api.model.indicator.TipoUsuario;
import com.g5tech.api.repository.CandidatoRepository;
import com.g5tech.api.repository.UsuarioCandidatoRepository;
import com.g5tech.api.repository.UsuarioFuncionarioRepository;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.jasypt.util.text.StrongTextEncryptor;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@RequiredArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioCandidatoRepository usuarioCandidatoRepository;
    private final StrongTextEncryptor strongTextEncryptor;
    private final UsuarioFuncionarioRepository usuarioFuncionarioRepository;
    private final EmailService emailService;
    private final CandidatoRepository candidatoRepository;

    public UsuarioCandidato saveNewUsuario(String email, String hashSenha, Candidato candidato) {

        UsuarioCandidato usuarioCandidato = UsuarioBuilder.buildUsuarioCandidato(email, hashSenha, candidato);

        return usuarioCandidatoRepository.save(usuarioCandidato);
    }

    public UsuarioResponseDTO realizarLogin(UsuarioRequestDTO dto) {

        if (dto.getTipo().equals(TipoUsuario.CANDIDATO.getValue())) {
            return this.getCandidatoIdByUsuario(dto);
        }

        return this.getPerfilByUsuario(dto);
    }

    public void redefinirSenha(UsuarioRedefineSenhaDTO dto) throws MessagingException {

        String senhaNova = this.generateRandom();

        if (dto.getTipo().equals(TipoUsuario.CANDIDATO.getValue())) {
            UsuarioCandidato usuarioCandidato = this.getUsuarioCandidatoByEmail(dto.getEmail());

            Candidato candidato = this.getCandidatoByEmail(dto.getEmail());

            usuarioCandidato.setHashSenha(senhaNova);
            usuarioCandidatoRepository.save(usuarioCandidato);
            emailService.sendNovaSenhaCandidato(candidato, senhaNova);
            return;
        }

        UsuarioFuncionario usuarioFuncionario = this.getUsuarioFuncionarioByEmail(dto.getEmail());
        usuarioFuncionario.setHashSenha(senhaNova);
        usuarioFuncionarioRepository.save(usuarioFuncionario);
        emailService.sendNovaSenhaFuncionario(dto.getEmail(), senhaNova);
    }

    private UsuarioResponseDTO getCandidatoIdByUsuario(UsuarioRequestDTO dto) {

        UsuarioCandidato usuarioCandidato = this.getUsuarioCandidatoByEmail(dto.getEmail());

        String senhaSalva = strongTextEncryptor.decrypt(usuarioCandidato.getHashSenha());

        if (!senhaSalva.equals(dto.getSenha())) {
            throw new SenhaInvalidaException();
        }

        return UsuarioResponseDTOBuilder.build(usuarioCandidato.getId(), null);
    }

    private UsuarioCandidato getUsuarioCandidatoByEmail(String email) {

        Optional<UsuarioCandidato> usuarioOptional= usuarioCandidatoRepository.findByEmail(email);

        if (!usuarioOptional.isPresent()) {
            throw new UsuarioNotFoundException();
        }

        return usuarioOptional.get();
    }

    private UsuarioResponseDTO getPerfilByUsuario(UsuarioRequestDTO dto) {

        UsuarioFuncionario usuarioFuncionario = this.getUsuarioFuncionarioByEmail(dto.getEmail());

        String senhaSalva = strongTextEncryptor.decrypt(usuarioFuncionario.getHashSenha());

        if (!senhaSalva.equals(dto.getSenha())) {
            throw new SenhaInvalidaException();
        }

        return UsuarioResponseDTOBuilder.build(usuarioFuncionario.getId(), usuarioFuncionario.getPerfil().getValue());
    }

    private UsuarioFuncionario getUsuarioFuncionarioByEmail(String email) {

        Optional<UsuarioFuncionario> usuarioOptional= usuarioFuncionarioRepository.findByEmail(email);

        if (!usuarioOptional.isPresent()) {
            throw new UsuarioNotFoundException();
        }

        return usuarioOptional.get();
    }

    private String generateRandom() {
        RandomString randomString = new RandomString(6, ThreadLocalRandom.current());
        return randomString.toString();
    }

    public Candidato getCandidatoByEmail(String email) {
        Optional<Candidato> candidatoOptional = candidatoRepository.findByEmail(email);

        if (!candidatoOptional.isPresent()) {
            throw new CandidatoNotFoundException();
        }

        return candidatoOptional.get();
    }

}
