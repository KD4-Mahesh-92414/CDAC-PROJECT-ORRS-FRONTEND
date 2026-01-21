package com.orrs.custom_exceptions;

public class PasswordMismatchException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public PasswordMismatchException(String msg) {
		super(msg);
	}

}
