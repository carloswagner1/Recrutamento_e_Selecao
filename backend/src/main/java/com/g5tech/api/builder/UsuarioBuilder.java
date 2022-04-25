package com.g5tech.api.builder;

import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.Perfil;
import com.g5tech.api.model.Usuario;

public class UsuarioBuilder {

    /**
     * Instancia um objeto Usuario a partir dos dados enviados
     *
     * @param email, hashSenha, candidatoId
     * @return Usuario
     */
    public static Usuario buildUsuarioCandidato(String email, String hashSenha, Candidato candidato) {

        Usuario usuario = new Usuario();

        usuario.setCandidato(candidato);
        usuario.setEmail(email);
        usuario.setHashSenha(hashSenha);
        usuario.setPerfil(Perfil.CANDIDATO);

        return usuario;
    }
}
