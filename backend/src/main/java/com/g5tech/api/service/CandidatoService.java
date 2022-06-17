package com.g5tech.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.g5tech.api.builder.*;
import com.g5tech.api.dto.*;
import com.g5tech.api.exception.CandidatoCpfNotUniqueException;
import com.g5tech.api.exception.CandidatoEmailNotUniqueException;
import com.g5tech.api.exception.CandidatoNotFoundException;
import com.g5tech.api.model.*;
import com.g5tech.api.model.indicator.StatusIndicator;
import com.g5tech.api.repository.CandidatoRepository;
import com.g5tech.api.repository.ExperienciaProfissionalRepository;
import com.g5tech.api.repository.FormacaoAcademicaRepository;
import com.g5tech.api.repository.ProcessoSeletivoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.jasypt.util.text.StrongTextEncryptor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static java.util.Objects.nonNull;

@Log4j2
@RequiredArgsConstructor
@Service
public class CandidatoService {

    private final ObjectMapper mapper;
    private final CandidatoRepository candidatoRepository;
    private final UsuarioService usuarioService;
    private final StrongTextEncryptor strongTextEncryptor;
    private final InscricaoService inscricaoService;
    private final ExperienciaProfissionalService experienciaProfissionalService;
    private final FormacaoAcademicaService formacaoAcademicaService;
    private final StatusService statusService;
    private final ProcessoSeletivoRepository processoSeletivoRepository;

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

    public UsuarioCandidatoDTO getOne(Long id) {

        Candidato candidato = this.getById(id);
        UsuarioCandidato usuarioCandidato = usuarioService.getUsuarioCandidatoByEmail(candidato.getEmail());
        String senha = strongTextEncryptor.decrypt(usuarioCandidato.getHashSenha());

        return CandidatoBuilder.buildUsuarioCandidatoDTO(candidato, senha);
    }

    public Candidato getById(Long id) {

        Optional<Candidato> candidatoOptional = candidatoRepository.findById(id);

        if (!candidatoOptional.isPresent()) {
            throw  new CandidatoNotFoundException();
        }

        return candidatoOptional.get();
    }

    public UsuarioCandidatoDTO update(Long id, UsuarioCandidatoDTO dto) {

        Candidato candidatoSalvo = this.getById(id);

        if (!candidatoSalvo.getEmail().equals(dto.getEmail())) {
            this.checkByEmail(dto.getEmail());
        }

        if (!candidatoSalvo.getCpf().equals(dto.getCpf())) {
            this.checkByCpf(dto.getCpf());
        }

        Candidato candidato = CandidatoBuilder.build(dto);
        BeanUtils.copyProperties(candidato, candidatoSalvo, "id");
        Candidato candidatoUpdated = candidatoRepository.save(candidatoSalvo);

        UsuarioCandidato usuarioCandidatoSalvo = usuarioService.getUsuarioCandidatoByEmail(dto.getEmail());
        UsuarioCandidato usuarioCandidato = UsuarioBuilder.buildUsuarioCandidato(dto.getEmail(), strongTextEncryptor.encrypt(dto.getSenha()), candidatoUpdated);
        BeanUtils.copyProperties(usuarioCandidato, usuarioCandidatoSalvo, "id");
        usuarioService.save(usuarioCandidatoSalvo);

        return dto;
    }

    public void delete(Long id) {

        Candidato candidato = this.getById(id);

        inscricaoService.deleteAllByCandidato(candidato);
        formacaoAcademicaService.deleAllFormacoesByCandidato(candidato);
        experienciaProfissionalService.deleAllExperienciasByCandidato(candidato);
        candidatoRepository.deleteById(id);
    }

    public List<InscricaoResponseDTO> getIncricoesByCandidatoId(Long id) {

        Candidato candidato = this.getById(id);

        List<Inscricao> inscricoes = inscricaoService.getByCandidato(candidato);

        if (inscricoes.isEmpty()) {
            return new ArrayList<>();
        }

        return InscricaoBuilder.buildDTOList(inscricoes);
    }

    public CandidatoCompletoDTO getExperienciaFormacaoByCandidatoId(Long id) {

        Candidato candidato = this.getById(id);

        List<FormacaoAcademica> formacaoAcademicaoList = formacaoAcademicaService.getAllByCandidato(candidato);
        List<FormacaoAcademicaDTO> formacaoAcademicaoDTOList = FormacaoAcademicaBuilder.buildDTOList(formacaoAcademicaoList);

        List<ExperienciaProfissional> experienciaProfissionalList = experienciaProfissionalService.getAllByCandidato(candidato);
        List<ExperienciaProfissionalDTO> experienciaProfissionalDTOList = ExperienciaProfissionalBuilder.buildDTOList(experienciaProfissionalList);

        return CandidatoBuilder.buildDTOCompleto(candidato, formacaoAcademicaoDTOList, experienciaProfissionalDTOList);
    }

    public void updateCurriculo(CurriculoRequestDTO dto) {

        Candidato candidato = this.getById(dto.getIdCandidato());

        if (!dto.getExperiencias().isEmpty()) {
            experienciaProfissionalService.saveOrUpdateList(candidato, dto.getExperiencias());
        }

        if (!dto.getFormacoes().isEmpty()) {
            formacaoAcademicaService.saveOrUpdateList(candidato, dto.getFormacoes());
        }
    }

    public void updateSituacao(Long id, CandidatoStatusDTO dto) {

        Candidato candidato = this.getById(id);
        ProcessoSeletivo processoSeletivo = processoSeletivoRepository.findById(Long.valueOf(dto.getProcessoId())).get();

        Inscricao inscricao = inscricaoService.getByCandidatoAndProcesso(candidato, processoSeletivo);

        Status status;

        if (dto.getSituacao().equals("classificado")) {
            status = statusService.getById(StatusIndicator.ENTREVISTA.getId());
        }
        else {
            status = statusService.getById(StatusIndicator.REPROVADO_TESTE.getId());
        }

        inscricao.setStatus(status);
        inscricao.setPontuacaoTeste(Double.valueOf(dto.getPontuacaoTeste()));
        inscricaoService.save(inscricao);
    }
}
