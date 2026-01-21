package com.orrs.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePasswordReqDTO {
	
    @NotBlank(message = "Password is required")
	private String password;
    @NotBlank(message = "New Password is required")
   	private String newPassword;
    @NotBlank(message = "New Confirm Password is required")
	private String newCnfPassword;
    
}
