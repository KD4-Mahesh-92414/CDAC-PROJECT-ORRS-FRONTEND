package com.orrs.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.orrs.enums.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingHistoryRespDTO {

    private Long bookingId;
    private String pnrNumber;
    private String trainName;
    private String trainNumber;
    private String trainRoute; // "Mumbai Central → New Delhi"
    private Integer totalPassengers;
    private LocalDate journeyDate;
    private BookingStatus status;
    private BigDecimal totalFare;
    private LocalDateTime bookingDate;
}