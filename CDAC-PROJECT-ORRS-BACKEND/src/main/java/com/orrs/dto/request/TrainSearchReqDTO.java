package com.orrs.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainSearchReqDTO {

	@NotBlank(message = "Source station cannot be empty")
    private String sourceStation;

    @NotBlank(message = "Destination station cannot be empty")
    private String destinationStation;

    @NotNull(message = "Date of journey is required")
    @FutureOrPresent(message = "Journey date cannot be in the past")
    private LocalDate journeyDate;
}

