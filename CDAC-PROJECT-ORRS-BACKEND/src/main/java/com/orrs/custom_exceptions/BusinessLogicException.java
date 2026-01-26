package com.orrs.custom_exceptions;

public class BusinessLogicException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public BusinessLogicException(String message) {
        super(message);
    }
}