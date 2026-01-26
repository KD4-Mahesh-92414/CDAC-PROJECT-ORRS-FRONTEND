package com.orrs.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.entities.SeatReservation;

public interface SeatReservationRepository extends JpaRepository<SeatReservation, Long> {

    @Query("""
        SELECT CONCAT(sr.coachLabel, '-', sr.seatNumber)
        FROM SeatReservation sr
        WHERE sr.schedule.id = :scheduleId
        AND sr.coachType.id = :coachTypeId
        AND CONCAT(sr.coachLabel, '-', sr.seatNumber) IN :seatIds
        AND sr.status = 'RESERVED'
        AND sr.expiresAt > :currentTime
        """)
    List<String> findReservedSeats(@Param("scheduleId") Long scheduleId,
                                   @Param("coachTypeId") Long coachTypeId,
                                   @Param("seatIds") List<String> seatIds,
                                   @Param("currentTime") LocalDateTime currentTime);

    @Query("""
        SELECT sr FROM SeatReservation sr
        WHERE sr.user.id = :userId
        AND (:scheduleId IS NULL OR sr.schedule.id = :scheduleId)
        AND sr.status = 'RESERVED'
        AND sr.expiresAt > :currentTime
        """)
    List<SeatReservation> findActiveReservationsByUser(@Param("userId") Long userId,
                                                        @Param("scheduleId") Long scheduleId,
                                                        @Param("currentTime") LocalDateTime currentTime);

    @Query("""
        SELECT sr.coachLabel, sr.seatNumber, sr.user.id, sr.expiresAt, sr.id
        FROM SeatReservation sr
        WHERE sr.schedule.id = :scheduleId
        AND sr.coachType.id = :coachTypeId
        AND sr.status = 'RESERVED'
        AND sr.expiresAt > :currentTime
        """)
    List<Object[]> findActiveReservationsForMatrix(@Param("scheduleId") Long scheduleId,
                                                    @Param("coachTypeId") Long coachTypeId,
                                                    @Param("currentTime") LocalDateTime currentTime);

    @Query("""
        SELECT sr.coachLabel, sr.seatNumber
        FROM SeatReservation sr
        WHERE sr.schedule.id = :scheduleId
        AND sr.coachType.id = :coachTypeId
        AND sr.status = 'RESERVED'
        AND sr.expiresAt > NOW()
        """)
    List<Object[]> findReservedSeatsForMatrix(@Param("scheduleId") Long scheduleId,
                                              @Param("coachTypeId") Long coachTypeId);

    @Modifying
    @Query("""
        UPDATE SeatReservation sr
        SET sr.status = 'EXPIRED'
        WHERE sr.id = :reservationId
        """)
    int markAsExpired(@Param("reservationId") Long reservationId);
}