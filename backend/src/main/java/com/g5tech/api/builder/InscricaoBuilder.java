package com.g5tech.api.builder;

import com.g5tech.api.dto.InscricaoResponseDTO;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.Inscricao;
import com.g5tech.api.model.ProcessoSeletivo;
import com.g5tech.api.model.Status;

import javax.jws.WebService;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class InscricaoBuilder {

    public static List<InscricaoResponseDTO> buildDTOList(List<Inscricao> inscricoes) {
        return inscricoes.stream()
                .map(InscricaoBuilder::buildDTO)
                .collect(Collectors.toList());
    }

    private static InscricaoResponseDTO buildDTO(Inscricao inscricao) {

        ProcessoSeletivo processoSeletivo = inscricao.getProcessoSeletivo();

        InscricaoResponseDTO dto = new InscricaoResponseDTO();
        dto.setId(inscricao.getId());
        dto.setCargo(processoSeletivo.getCargo().getNome());
        dto.setLocal(processoSeletivo.getSolicitacaoVaga().getLocal());
        dto.setTipoContratacao(processoSeletivo.getSolicitacaoVaga().getTipoContratacao());

        return dto;
    }

    public static Inscricao build(Candidato candidato, ProcessoSeletivo processoSeletivo, Status status) {

        Inscricao inscricao = new Inscricao();

        inscricao.setCandidato(candidato);
        inscricao.setProcessoSeletivo(processoSeletivo);
        inscricao.setStatus(status);
        inscricao.setDataCriacao(new Date());
        inscricao.setPontuacaoTeste(null);

        return inscricao;
    }
}
