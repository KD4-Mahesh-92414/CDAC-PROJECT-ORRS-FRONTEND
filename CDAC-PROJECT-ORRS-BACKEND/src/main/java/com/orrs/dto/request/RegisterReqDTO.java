package com.orrs.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterReqDTO {

    @NotBlank(message = "Full name is required")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
	private String fullName;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
	private String email;
    @NotBlank(message = "Password is required")
	private String password;
    @NotBlank(message = "Confirm Password is required")
	private String cnfPassword;
	@NotBlank(message = "Mobile No is required")
	@Size(min = 10, max = 10)
	private String mobile;
	
}
