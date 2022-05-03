package com.g5tech.api.builder;

import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.indicator.Perfil;
import com.g5tech.api.model.UsuarioCandidato;

public class UsuarioBuilder {

    /**
     * Instancia um objeto Usuario a partir dos dados enviados
     *
     * @param email, hashSenha, candidatoId
     * @return Usuario
     */
    public static UsuarioCandidato buildUsuarioCandidato(String email, String hashSenha, Candidato candidato) {

        UsuarioCandidato usuarioCandidato = new UsuarioCandidato();

        usuarioCandidato.setCandidato(candidato);
        usuarioCandidato.setEmail(email);
        usuarioCandidato.setHashSenha(hashSenha);

        return usuarioCandidato;
    }
}
