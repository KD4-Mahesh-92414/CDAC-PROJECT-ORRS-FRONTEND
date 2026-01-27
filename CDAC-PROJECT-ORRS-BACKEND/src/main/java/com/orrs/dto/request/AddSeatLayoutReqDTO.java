package com.orrs.dto.request;

import com.orrs.enums.SeatType;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
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
public class AddSeatLayoutReqDTO {

    @NotNull(message = "Coach type ID is required")
    @Min(value = 1, message = "Invalid coach type ID")
    private Long coachTypeId;

    @NotNull(message = "Seat number is required")
    @Min(value = 1, message = "Seat number must be at least 1")
    @Max(value = 72, message = "Seat number must be at most 72")
    private Integer seatNumber;

    @NotNull(message = "Seat type is required")
    private SeatType seatType;
}