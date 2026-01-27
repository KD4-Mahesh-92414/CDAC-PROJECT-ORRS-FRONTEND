package com.orrs.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PNRStatusReqDTO {

    @NotBlank(message = "PNR number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "PNR must be exactly 10 digits")
    private String pnrNumber;
}