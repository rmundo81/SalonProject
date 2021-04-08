package com.salon.api.common;

public class SalonException extends RuntimeException{
    public SalonException (String detail) {
        super(detail);
    }
}
