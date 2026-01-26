package com.orrs.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatReservationReqDTO {

    @NotNull(message = "Schedule ID is required")
    private Long scheduleId;

    @NotNull(message = "Coach type ID is required")
    private Long coachTypeId;

    @NotNull(message = "Source station ID is required")
    private Long sourceStationId;

    @NotNull(message = "Destination station ID is required")
    private Long destinationStationId;

    @NotEmpty(message = "Selected seats cannot be empty")
    private List<String> selectedSeats; // ["S1-45", "S1-46"]

    private String sessionId;
}