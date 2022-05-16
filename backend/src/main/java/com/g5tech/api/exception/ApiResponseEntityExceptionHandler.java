package com.g5tech.api.exception;

import com.g5tech.api.dto.ErrorDTO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ApiResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ UsuarioNotFoundException.class })
    public ResponseEntity<Object> handleUsuarioNotFoundException(UsuarioNotFoundException ex, WebRequest request) {

        ErrorDTO error = new ErrorDTO("Usuário inválido");

        return handleExceptionInternal(ex, error, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler({ SenhaInvalidaException.class })
    public ResponseEntity<Object> handleSenhaInvalidaException(SenhaInvalidaException ex, WebRequest request) {

        ErrorDTO error = new ErrorDTO("Senha está incorreta");

        return handleExceptionInternal(ex, error, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler({ CandidatoNotFoundException.class })
    public ResponseEntity<Object> handleCandidatoNotFoundException(CandidatoNotFoundException ex, WebRequest request) {

        ErrorDTO error = new ErrorDTO("Candidato não encontrado");

        return handleExceptionInternal(ex, error, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }


    @ExceptionHandler({ InscricaoNotFoundException.class })
    public ResponseEntity<Object> handleInscricaoNotFoundException(InscricaoNotFoundException ex, WebRequest request) {

        ErrorDTO error = new ErrorDTO("Inscrição não encontrado");

        return handleExceptionInternal(ex, error, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }


    @ExceptionHandler({ ProcessoSeletivoNotFoundException.class })
    public ResponseEntity<Object> handleProcessoSeletivoNotFoundException(ProcessoSeletivoNotFoundException ex, WebRequest request) {

        ErrorDTO error = new ErrorDTO("Processo seletivo não encontrado");

        return handleExceptionInternal(ex, error, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler({ CandidatoEmailNotUniqueException.class })
    public ResponseEntity<Object> handleCandidatoEmailNotUniqueException(CandidatoEmailNotUniqueException ex, WebRequest request) {

        ErrorDTO error = new ErrorDTO("Email já cadastrado para outra conta");

        return handleExceptionInternal(ex, error, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler({ CandidatoCpfNotUniqueException.class })
    public ResponseEntity<Object> handleCandidatoCpfNotUniqueException(CandidatoCpfNotUniqueException ex, WebRequest request) {

        ErrorDTO error = new ErrorDTO("CPF já cadastrado em outra conta");

        return handleExceptionInternal(ex, error, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

}
