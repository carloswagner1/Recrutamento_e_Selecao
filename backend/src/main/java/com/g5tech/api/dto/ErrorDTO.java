package com.g5tech.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * ErrorDTO --- representa um erro que ocorreu durante a request.
 */

@Getter
@Setter
@AllArgsConstructor
public class ErrorDTO {
    private String message;
}
