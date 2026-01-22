package com.orrs.dto.request;

import com.orrs.enums.AccountStatus;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UpdateStatusReqDTO {

	@NotNull(message = "Status is required")
	private AccountStatus status;
}
