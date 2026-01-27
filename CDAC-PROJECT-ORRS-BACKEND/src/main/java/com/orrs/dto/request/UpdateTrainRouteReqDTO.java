package com.orrs.dto.request;

import java.time.LocalTime;

import com.orrs.enums.StopType;

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
public class UpdateTrainRouteReqDTO {

    @NotNull(message = "Train ID is required")
    @Min(value = 1, message = "Invalid train ID")
    private Long trainId;

    @NotNull(message = "Station ID is required")
    @Min(value = 1, message = "Invalid station ID")
    private Long stationId;

    @NotNull(message = "Sequence number is required")
    @Min(value = 1, message = "Sequence number must be at least 1")
    private Integer sequenceNo;

    private LocalTime arrivalTime;

    private LocalTime departureTime;

    @Min(value = 0, message = "Halt minutes cannot be negative")
    private Integer haltMinutes;

    @Min(value = 0, message = "Distance from source cannot be negative")
    private Integer distanceFromSource;

    @Min(value = 1, message = "Day number must be at least 1")
    private Integer dayNumber = 1;

    @NotNull(message = "Major station flag is required")
    private boolean isMajorStation = false;

    @NotNull(message = "Stop type is required")
    private StopType stopType = StopType.REGULAR;
}