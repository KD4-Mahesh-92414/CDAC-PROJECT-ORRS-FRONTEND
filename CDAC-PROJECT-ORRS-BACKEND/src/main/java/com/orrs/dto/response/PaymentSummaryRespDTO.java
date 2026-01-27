package com.orrs.dto.response;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentSummaryRespDTO {

    private BigDecimal totalSpent;
    private Long totalPayments;
    private BigDecimal totalRefunded;
}