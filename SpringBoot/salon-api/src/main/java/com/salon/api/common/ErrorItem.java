package com.salon.api.common;

import lombok.Value;

@Value
public class ErrorItem {

    String field;
    Object rejectedValue;
    String message;
}
