package com.orrs.repositories;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.dto.response.PaymentHistoryRespDTO;
import com.orrs.entities.Payment;
import com.orrs.enums.PaymentStatus;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("""
        SELECT new com.orrs.dto.response.PaymentHistoryRespDTO(
            p.id, b.pnrNumber, t.trainName, t.trainNumber, b.journeyDate,
            p.amount, p.paymentMethod, p.status, p.paymentDate, p.transactionId,
            p.refundAmount, p.refundDate
        )
        FROM Payment p
        JOIN p.booking b
        JOIN b.schedule s
        JOIN s.train t
        WHERE p.user.id = :userId
        ORDER BY p.paymentDate DESC
        """)
    List<PaymentHistoryRespDTO> findPaymentHistoryByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT COALESCE(SUM(p.amount), 0)
        FROM Payment p
        WHERE p.user.id = :userId
        AND p.status = :status
        """)
    BigDecimal getTotalAmountByUserIdAndStatus(@Param("userId") Long userId, @Param("status") PaymentStatus status);

    @Query("""
        SELECT COUNT(p)
        FROM Payment p
        WHERE p.user.id = :userId
        AND p.status = :status
        """)
    Long getPaymentCountByUserIdAndStatus(@Param("userId") Long userId, @Param("status") PaymentStatus status);

    @Query("""
        SELECT COALESCE(SUM(p.refundAmount), 0)
        FROM Payment p
        WHERE p.user.id = :userId
        AND p.refundAmount > 0
        """)
    BigDecimal getTotalRefundedAmountByUserId(@Param("userId") Long userId);
}