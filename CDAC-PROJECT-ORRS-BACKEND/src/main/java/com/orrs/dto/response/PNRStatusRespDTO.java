package com.orrs.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.orrs.enums.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PNRStatusRespDTO {

    private String pnrNumber;
    private BookingStatus bookingStatus;
    private LocalDate journeyDate;
    private LocalDateTime bookingDate;
    private BigDecimal totalFare;
    
    // Train Information
    private TrainInfoDTO trainInfo;
    
    // Route Information
    private RouteInfoDTO routeInfo;
    
    // Passenger Information
    private List<PassengerInfoDTO> passengers;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TrainInfoDTO {
        private String trainNumber;
        private String trainName;
        private String coachType;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RouteInfoDTO {
        private String sourceStation;
        private String destinationStation;
        private String departureTime;
        private String arrivalTime;
        private String distance;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PassengerInfoDTO {
        private String name;
        private Integer age;
        private String gender;
        private String seatNumber;
        private String status; // CONFIRMED, CANCELLED, etc.
    }
}