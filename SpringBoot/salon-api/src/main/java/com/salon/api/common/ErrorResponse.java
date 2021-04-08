package com.salon.api.common;

import lombok.Value;

import java.util.List;

@Value
public class ErrorResponse {

    String type;
    String message;
    List<ErrorItem> errors;
}
