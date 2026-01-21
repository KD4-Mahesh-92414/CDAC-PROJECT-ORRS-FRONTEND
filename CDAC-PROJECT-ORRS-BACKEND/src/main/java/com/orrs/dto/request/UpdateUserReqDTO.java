package com.orrs.dto.request;

import java.time.LocalDate;

import com.orrs.enums.Gender;
import com.orrs.enums.PreferedClass;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserReqDTO {
    @NotBlank(message = "Full name is required")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
	private String fullName;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
	private String email;
	@NotBlank(message = "Mobile No is required")
	@Size(min = 10, max = 10)
	private String mobile;
	@NotNull(message = "Gender is required")
	private Gender gender;
	@NotNull(message = "Date of birth is required")
	private LocalDate dob;
	@NotBlank(message = "Address is required")
	private String address;
	@NotBlank(message = "Aadhar No is required")
	private String aadharNo;
	@NotNull(message = "Prefered class is required")
	private PreferedClass prefClass;
}


