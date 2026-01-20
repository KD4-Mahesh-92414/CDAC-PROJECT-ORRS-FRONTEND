package com.orrs.dto.common;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ApiResponseDTO<T> {

	private String message;
	private String status;
	private T data;
	private LocalDate timeStamp;
	
	public ApiResponseDTO(String message, String status, T data, LocalDate timeStamp) {
		super();
		this.message = message;
		this.status = status;
		this.data = data;
		this.timeStamp = LocalDate.now();
	}
	
}
