package com.orrs.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.orrs.enums.BookingStatus;
import com.orrs.enums.BookingType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetailRespDTO {

    private Long bookingId;
    private String pnrNumber;
    private BookingStatus status;
    private BookingType bookingType;
    private LocalDateTime bookingDate;
    private LocalDate journeyDate;
    private BigDecimal totalFare;
    
    // Train Details
    private TrainDetailsDTO trainDetails;
    
    // Route Details
    private RouteDetailsDTO routeDetails;
    
    // Passenger Details
    private List<PassengerDetailsDTO> passengers;
    
    // Payment Details
    private PaymentDetailsDTO paymentDetails;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TrainDetailsDTO {
        private String trainNumber;
        private String trainName;
        private String coachType;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RouteDetailsDTO {
        private String sourceStation;
        private String destinationStation;
        private String departureTime;
        private String arrivalTime;
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
        private BigDecimal fare;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentDetailsDTO {
        private String transactionId;
        private String paymentMethod;
        private String paymentStatus;
        private LocalDateTime paymentDate;
        private BigDecimal refundAmount;
    }
}