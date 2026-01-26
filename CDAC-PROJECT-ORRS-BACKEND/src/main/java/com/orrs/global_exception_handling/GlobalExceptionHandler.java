package com.orrs.global_exception_handling;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.naming.AuthenticationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.orrs.custom_exceptions.BusinessLogicException;
import com.orrs.custom_exceptions.InvalidRequestException;
import com.orrs.custom_exceptions.PasswordMismatchException;
import com.orrs.custom_exceptions.ResourceAlreadyExistsException;
import com.orrs.custom_exceptions.ResourceNotFoundException;
import com.orrs.custom_exceptions.ServiceException;
import com.orrs.dto.common.ApiErrorResponseDTO;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	//generic catch block
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception ex){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiErrorResponseDTO( "FAILED", ex.getMessage()));
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException ex){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiErrorResponseDTO( "FAILED", ex.getMessage()));
	}
	
	@ExceptionHandler(ResourceAlreadyExistsException.class)
	public ResponseEntity<?> handleResourceAlreadyExistsException(ResourceAlreadyExistsException ex){
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiErrorResponseDTO( "FAILED", ex.getMessage()));
	}
	
	@ExceptionHandler(PasswordMismatchException.class)
	public ResponseEntity<?> handlePasswordMismatchException(PasswordMismatchException ex){
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiErrorResponseDTO( "FAILED", ex.getMessage()));
	}
	
	@ExceptionHandler(InvalidRequestException.class)
	public ResponseEntity<?> handleInvalidRequestException(InvalidRequestException ex){
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiErrorResponseDTO( "FAILED", ex.getMessage()));
	}
	
	//request body validations
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotFoundException(MethodArgumentNotValidException ex){
		List<FieldError> errorList = ex.getFieldErrors();
		Map<String, String> map = errorList.stream()
				.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (v1, v2)-> v1+" "+v2));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
	}
	
	//path variable or query string validation 
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<?> handleConstraintVoilationException(ConstraintViolationException ex){
		Map<String, String> map = ex.getConstraintViolations()
				.stream().collect(Collectors.toMap(voilation -> voilation.getPropertyPath().toString(), ConstraintViolation::getMessage, (v1, v2)-> v1+" "+v2));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
	}
	
	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<?> handleAuthenticationException(AuthenticationException e) {
		System.out.println("in catch -Spring sec detected  Authentication Exception "+e);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiErrorResponseDTO("FAILED", e.getMessage()));
	}
	
	@ExceptionHandler(BusinessLogicException.class)
	public ResponseEntity<?> handleBusinessLogicException(BusinessLogicException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiErrorResponseDTO("FAILED", ex.getMessage()));
	}
	
	@ExceptionHandler(ServiceException.class)
	public ResponseEntity<?> handleServiceException(ServiceException ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiErrorResponseDTO("FAILED", ex.getMessage()));
	}

	
}
