package com.orrs.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatReservationRespDTO {

    private Long reservationId;
    private List<String> lockedSeats;
    private LocalDateTime expiresAt;
    private Integer timeoutMinutes;
    private String status;
    private List<String> unavailableSeats;
    private List<String> suggestedAlternatives;
}