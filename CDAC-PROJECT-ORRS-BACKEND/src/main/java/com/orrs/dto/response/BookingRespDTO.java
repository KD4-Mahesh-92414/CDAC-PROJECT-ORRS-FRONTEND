package com.orrs.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingRespDTO {

    private String pnrNumber;
    private String bookingStatus;
    private BigDecimal totalFare;
    private LocalDate journeyDate;
    private TrainDetailsDTO trainDetails;
    private List<PassengerDetailsDTO> passengers;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TrainDetailsDTO {
        private String trainNumber;
        private String trainName;
        private String sourceStation;
        private String destinationStation;
        private String coachType;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PassengerDetailsDTO {
        private String name;
        private Integer age;
        private String gender;
        private String seatNumber;
        private String status;
        private BigDecimal fare;
    }
}