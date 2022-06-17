package com.g5tech.api.service;

import com.g5tech.api.builder.DepartamentoCargoDTOBuilder;
import com.g5tech.api.builder.UsuarioBuilder;
import com.g5tech.api.builder.UsuarioResponseDTOBuilder;
import com.g5tech.api.dto.*;
import com.g5tech.api.exception.CandidatoNotFoundException;
import com.g5tech.api.exception.SenhaInvalidaException;
import com.g5tech.api.exception.UsuarioNotFoundException;
import com.g5tech.api.model.*;
import com.g5tech.api.model.indicator.TipoUsuario;
import com.g5tech.api.repository.CandidatoRepository;
import com.g5tech.api.repository.UsuarioCandidatoRepository;
import com.g5tech.api.repository.UsuarioFuncionarioRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.jasypt.util.text.StrongTextEncryptor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioCandidatoRepository usuarioCandidatoRepository;
    private final StrongTextEncryptor strongTextEncryptor;
    private final UsuarioFuncionarioRepository usuarioFuncionarioRepository;
    private final EmailService emailService;
    private final CandidatoRepository candidatoRepository;
    private final CargoService cargoService;
    private final DepartamentoService departamentoService;

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

    public void redefinirSenha(UsuarioRedefineSenhaDTO dto) {

        String senhaNova = this.generateRandom();

        if (dto.getTipo().equals(TipoUsuario.CANDIDATO.getValue())) {
            UsuarioCandidato usuarioCandidato = this.getUsuarioCandidatoByEmail(dto.getEmail());

            Candidato candidato = this.getCandidatoByEmail(dto.getEmail());

            usuarioCandidato.setHashSenha(strongTextEncryptor.encrypt(senhaNova));
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

    public UsuarioCandidato getUsuarioCandidatoByEmail(String email) {

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

        return UsuarioResponseDTOBuilder.build(usuarioFuncionario.getId(), usuarioFuncionario.getPerfil());
    }

    private UsuarioFuncionario getUsuarioFuncionarioByEmail(String email) {

        Optional<UsuarioFuncionario> usuarioOptional= usuarioFuncionarioRepository.findByEmail(email);

        if (!usuarioOptional.isPresent()) {
            throw new UsuarioNotFoundException();
        }

        return usuarioOptional.get();
    }

    private String generateRandom() {
        return RandomStringUtils.random(6, true, true);
    }

    public Candidato getCandidatoByEmail(String email) {
        Optional<Candidato> candidatoOptional = candidatoRepository.findByEmail(email);

        if (!candidatoOptional.isPresent()) {
            throw new CandidatoNotFoundException();
        }

        return candidatoOptional.get();
    }

    public void save(UsuarioCandidato usuarioCandidato) {
        usuarioCandidatoRepository.save(usuarioCandidato);
    }

    public DepartamentoCargoDTO buscaDepartamento(Long id) {

        UsuarioFuncionario usuario = this.getUsuarioFuncionarioById(id);

        Departamento departamento = usuario.getDepartamento();

        List<Cargo> cargos = cargoService.getByDepartamento(departamento);

        return DepartamentoCargoDTOBuilder.build(departamento, cargos);
    }

    public UsuarioFuncionario getUsuarioFuncionarioById(Long id) {

        Optional<UsuarioFuncionario> usuarioFuncionarioOptional = usuarioFuncionarioRepository.findById(id);

        if (!usuarioFuncionarioOptional.isPresent()) {
            throw  new UsuarioNotFoundException();
        }

        return usuarioFuncionarioOptional.get();
    }

    public List<UsuarioFuncionarioResponseDTO> buscaUsuariosFuncionarios() {

        List<UsuarioFuncionario> usuarioFuncionarioList = usuarioFuncionarioRepository.findAll();

        return usuarioFuncionarioList.stream()
                .map(usuarioFuncionario ->
                    UsuarioFuncionarioResponseDTO
                        .builder()
                        .id(usuarioFuncionario.getId().toString())
                        .nome(usuarioFuncionario.getNome())
                        .cpf(usuarioFuncionario.getCpf())
                        .celular(usuarioFuncionario.getCelular())
                        .email(usuarioFuncionario.getEmail())
                        .perfil(usuarioFuncionario.getPerfil())
                        .departamento(usuarioFuncionario.getDepartamento().getNome())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public Long create(UsuarioFuncionarioRequestDTO dto) {

        String hashSenha = strongTextEncryptor.encrypt(dto.getSenha());

        Departamento departamento = departamentoService.getDepartamentoByName(dto.getDepartamento());

        UsuarioFuncionario usuarioFuncionario = UsuarioBuilder.buildUsuarioFuncionario(dto, hashSenha, departamento);

        UsuarioFuncionario usuarioFuncionarioSaved = usuarioFuncionarioRepository.save(usuarioFuncionario);

        return usuarioFuncionarioSaved.getId();
    }

    public void delete(Long id) {

        // checando se inscricao existe no banco
        UsuarioFuncionario usuarioFuncionario = this.getUsuarioFuncionarioById(id);

        // Deletando
        usuarioFuncionarioRepository.delete(usuarioFuncionario);
    }

    public void update(Long id, UsuarioFuncionarioRequestDTO dto) {

        UsuarioFuncionario usuarioFuncionarioSaved = this.getUsuarioFuncionarioById(id);

        String hashSenha = strongTextEncryptor.encrypt(dto.getSenha());

        Departamento departamento = departamentoService.getDepartamentoByName(dto.getDepartamento());

        UsuarioFuncionario usuarioFuncionario = UsuarioBuilder.buildUsuarioFuncionario(dto, hashSenha, departamento);

        BeanUtils.copyProperties(usuarioFuncionario, usuarioFuncionarioSaved, "id");

        usuarioFuncionarioRepository.save(usuarioFuncionarioSaved);
    }
}
