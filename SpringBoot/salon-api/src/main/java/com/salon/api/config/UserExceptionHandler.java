package com.salon.api.config;

import com.salon.api.common.ErrorItem;
import com.salon.api.common.ErrorResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class UserExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<ErrorItem> errorItems = ex.getBindingResult().getFieldErrors().stream().map(
                e -> new ErrorItem(e.getField(),e.getRejectedValue(),e.getDefaultMessage())
        ).collect(Collectors.toList());

        return new ResponseEntity<>(new ErrorResponse("BAD_REQUEST","Invalid Request", errorItems),HttpStatus.BAD_REQUEST);
    }
}
