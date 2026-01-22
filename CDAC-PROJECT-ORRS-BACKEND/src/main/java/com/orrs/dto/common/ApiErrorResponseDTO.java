package com.orrs.dto.common;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiErrorResponseDTO {
	
	private String status;	
	private String message;
	private LocalDateTime timeStamp;
	
	public ApiErrorResponseDTO(String status, String message) {
		super();
		this.status = status;
		this.message = message;
		this.timeStamp = LocalDateTime.now();
	}
	
	
	
}
