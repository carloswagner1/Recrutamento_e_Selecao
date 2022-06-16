package com.g5tech.api.service;

import com.g5tech.api.dto.AgendarEntrevistaDTO;
import com.g5tech.api.dto.TesteDTO;
import com.g5tech.api.model.Candidato;
import com.g5tech.api.model.Cargo;
import com.g5tech.api.model.ProcessoSeletivo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Service
public class EmailService {

    private static final String EMAIL_G5TECH = "g5tech.fatec@gmail.com";

    private final JavaMailSender mailSender;

    public void sendNovaSenhaCandidato(Candidato candidato, String senhaNova) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(EMAIL_G5TECH);
        message.setTo(candidato.getEmail());
        message.setSubject("Solicitação de nova senha");
        message.setText("Olá, " + candidato.getNome() + "!\n"
                +"\nSegue nova senha provisória conforme solicitado:\n"
                + "\nNova senha: " + senhaNova + "\n"
                + "\nEquipe G5 Tech");

        try {
            mailSender.send(message);
        } catch (MailException ex) {
            log.error("EmailService sendNovaSenhaCandidato", ex);
            throw ex;
        }

    }

    public void sendNovaSenhaFuncionario(String email, String senhaNova) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(EMAIL_G5TECH);
        message.setTo(email);
        message.setSubject("Solicitação de nova senha");
        message.setText("Olá!\n"
                +"\nSegue nova senha provisória conforme solicitado:\n"
                + "\nNova senha: " + senhaNova + "\n"
                + "\nEquipe G5 Tech");

        try {
            mailSender.send(message);
        } catch (MailException ex) {
            log.error("EmailService sendNovaSenhaFuncionario", ex);
            throw ex;
        }
    }

    public void sendProcessoEncerrado(String cargo, List<String> emailList) {

        String[] emailArray = emailList.toArray(new String[0]);

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(EMAIL_G5TECH);
        message.setTo(EMAIL_G5TECH);
        message.setBcc(emailArray);
        message.setSubject("Processo Seletivo para o cargo: ".concat(cargo).concat(" foi encerrado"));
        message.setText("Olá!\n"
                +"\nO processo seletivo para o cargo: " + cargo + " foi encerrado.\n"
                + "\nDesejamos sorte nas suas próximas tentativas.\n"
                + "\nEquipe G5 Tech");

        try {
            mailSender.send(message);
        } catch (MailException ex) {
            log.error("EmailService sendProcessoEncerrado", ex);
            throw ex;
        }
    }

    public void sendTeste(String cargo, TesteDTO dto, List<String> emailList) {

        String[] emailArray = emailList.toArray(new String[0]);

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(EMAIL_G5TECH);
        message.setTo(EMAIL_G5TECH);
        message.setBcc(emailArray);
        message.setSubject("O teste para o cargo: ".concat(cargo).concat(" já está disponível"));
        message.setText("Olá!\n"
                +"\nO teste do processo seletivo para o cargo: " + cargo + " está disponível.\n"
                + "\nTema:" + dto.getTema() + "\n"
                + "\nAssunto:" + dto.getAssunto() + "\n"
                + "\nLink:" + dto.getLink() + "\n"
                + "\nDesejamos sorte nessa etapa e ficamos a disposição.\n"
                + "\nEquipe G5 Tech");

        try {
            mailSender.send(message);
        } catch (MailException ex) {
            log.error("EmailService sendProcessoEncerrado", ex);
            throw ex;
        }
    }

    public void sendEmailEntrevista(Candidato candidato, ProcessoSeletivo processoSeletivo, AgendarEntrevistaDTO dto) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(EMAIL_G5TECH);
        message.setTo(candidato.getEmail());
        message.setCc(dto.getEmail());
        message.setSubject("Entrevista para o cargo: ".concat(processoSeletivo.getCargo().getNome()).concat(" foi agendada"));
        message.setText("Olá!\n"
                +"\nEntrevista para o cargo: " + processoSeletivo.getCargo().getNome() + " está agendada.\n"
                + "\nData:" + dto.getDataEntrevista() + "\n"
                + "\nHora:" + dto.getHoraEntrevista() + "\n"
                + "\nLink:" + dto.getLinkEntrevista() + "\n"
                + "\nDesejamos sorte nessa etapa e ficamos a disposição.\n"
                + "\nEquipe G5 Tech");

        try {
            mailSender.send(message);
        } catch (MailException ex) {
            log.error("EmailService sendProcessoEncerrado", ex);
            throw ex;
        }
    }
}
