package com.orrs.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AddCoachTypeReqDTO {

    @NotBlank(message = "Type code is required")
    @Size(max = 20, message = "Type code must be at most 20 characters")
    private String typeCode;

    @NotBlank(message = "Type name is required")
    @Size(max = 100, message = "Type name must be at most 100 characters")
    private String typeName;

    @NotNull(message = "Total seats is required")
    @Min(value = 1, message = "Total seats must be at least 1")
    private Integer totalSeats;

    @Size(max = 255, message = "Coach image URL must be at most 255 characters")
    private String coachImageUrl;

    @Size(max = 500, message = "Description must be at most 500 characters")
    private String description;
}