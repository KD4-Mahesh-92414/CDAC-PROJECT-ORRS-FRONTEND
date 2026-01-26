package com.orrs.dto.response;

import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchResultRespDTO {

	private Long trainId;
	private Long scheduleId;       // Crucial: Use this ID to book the ticket
    private String trainNumber;
    private String trainName;
    
    private String sourceStationName;
    private String destinationStationName;
    
    private LocalTime departureTime;  // Time at Source
    private LocalTime arrivalTime;    // Time at Destination
    private Integer travelDurationMinutes; 
    
    private Integer distanceKm;       // Needed for fare calculation on UI
    private String daysOfRun;         // Days when train runs (e.g., "Mon,Wed,Fri")

    // Add this new field
    private List<TrainCoachRespDTO> classOptions;
}
