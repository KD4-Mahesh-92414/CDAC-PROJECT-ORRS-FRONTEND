package com.orrs.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthReqDTO {
	
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid Email Format")
	private String email;
	@NotBlank
	private String password;

}
