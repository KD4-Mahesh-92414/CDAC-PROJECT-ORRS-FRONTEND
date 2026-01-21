package com.orrs.dto.response;

import java.time.LocalDate;


import com.orrs.enums.Gender;
import com.orrs.enums.PreferedClass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDetailsRespDTO {

	private String fullName;
	private String email;
	private String mobile;
	private Gender gender;
	private LocalDate dob;
	private String address;
	private String aadharNo;
	private PreferedClass prefClass;

}
