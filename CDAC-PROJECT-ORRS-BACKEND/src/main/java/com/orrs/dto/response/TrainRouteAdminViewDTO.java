package com.orrs.dto.response;

import java.time.LocalTime;

import com.orrs.enums.StopType;

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
public class TrainRouteAdminViewDTO {

    private Long id;
    private Long trainId;
    private String trainNumber;
    private String trainName;
    private Long stationId;
    private String stationCode;
    private String stationName;
    private Integer sequenceNo;
    private LocalTime arrivalTime;
    private LocalTime departureTime;
    private Integer haltMinutes;
    private Integer distanceFromSource;
    private Integer dayNumber;
    private boolean isMajorStation;
    private StopType stopType;
}