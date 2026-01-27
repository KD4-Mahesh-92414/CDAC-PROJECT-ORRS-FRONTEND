package com.orrs.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.orrs.enums.PaymentMethod;
import com.orrs.enums.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentHistoryRespDTO {

    private Long paymentId;
    private String pnrNumber;
    private String trainName;
    private String trainNumber;
    private LocalDate journeyDate;
    private BigDecimal amount;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
    private LocalDateTime paymentDate;
    private String transactionId;
    private BigDecimal refundAmount;
    private LocalDateTime refundDate;
}