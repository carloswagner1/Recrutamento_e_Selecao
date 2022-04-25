package com.g5tech.api.service;

import com.g5tech.api.builder.UsuarioBuilder;
import com.g5tech.api.dto.UsuarioDTO;
import com.g5tech.api.exception.ValidateException;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.Usuario;
import com.g5tech.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@RequiredArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public Usuario getByEmail(String email) throws ValidateException {

        Optional<Usuario> usuarioOptional= usuarioRepository.findByEmail(email);

        if (!usuarioOptional.isPresent()) {
            throw new ValidateException("Usuario não foi encontrado no sistema");
        }

        return usuarioOptional.get();
    }

    public Usuario saveNewUsuario(String email, String hashSenha, Candidato candidato) {

        Usuario usuario = UsuarioBuilder.buildUsuarioCandidato(email, hashSenha, candidato);

        return usuarioRepository.save(usuario);
    }

    public void redefinirSenha(String email) throws ValidateException {

        Usuario usuario = this.getByEmail(email);
        usuario.setHashSenha(this.generateRandom());
        usuarioRepository.save(usuario);
    }

    private String generateRandom() {
        RandomString randomString = new RandomString(6, ThreadLocalRandom.current());
        return randomString.toString();
    }
}
