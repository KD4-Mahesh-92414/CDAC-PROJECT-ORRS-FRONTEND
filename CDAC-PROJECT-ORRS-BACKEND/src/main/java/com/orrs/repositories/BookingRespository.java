package com.orrs.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.dto.response.BookingHistoryRespDTO;
import com.orrs.entities.Booking;
import com.orrs.enums.BookingStatus;

public interface BookingRespository extends JpaRepository<Booking, Long> {
	
	// CORRECTED QUERY:
    // 1. We count 't' (tickets) to get the actual seat count.
    // 2. We check 'b.coachType.id' because the Class is defined at the Booking level.
    @Query("""
        SELECT COUNT(t) 
        FROM Booking b 
        JOIN b.tickets t 
        WHERE b.schedule.id = :scheduleId 
        AND b.coachType.id = :coachTypeId  
        AND b.status = :status
        """)
    Integer countBookedSeats(
        @Param("scheduleId") Long scheduleId, 
        @Param("coachTypeId") Long coachTypeId,
        @Param("status") BookingStatus status
    );

    @Query("""
        SELECT new com.orrs.dto.response.BookingHistoryRespDTO(
            b.id, b.pnrNumber, t.trainName, t.trainNumber,
            CONCAT(ss.stationName, ' → ', ds.stationName),
            SIZE(b.tickets), b.journeyDate, b.status, b.totalFare, b.bookingDate
        )
        FROM Booking b
        JOIN b.schedule s
        JOIN s.train t
        JOIN b.sourceStation ss
        JOIN b.destinationStation ds
        WHERE b.user.id = :userId
        ORDER BY b.bookingDate DESC
        """)
    List<BookingHistoryRespDTO> findBookingHistoryByUserId(@Param("userId") Long userId);

    @Query("SELECT b FROM Booking b WHERE b.id = :bookingId AND b.user.id = :userId")
    Optional<Booking> findByIdAndUserId(@Param("bookingId") Long bookingId, @Param("userId") Long userId);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.user.id = :userId")
    Long countTotalBookingsByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.user.id = :userId AND b.status = :status")
    Long countBookingsByUserIdAndStatus(@Param("userId") Long userId, @Param("status") BookingStatus status);

    @Query("""
        SELECT COUNT(b) FROM Booking b 
        WHERE b.user.id = :userId 
        AND b.status = 'CONFIRMED' 
        AND b.journeyDate < :currentDate
        """)
    Long countCompletedBookingsByUserId(@Param("userId") Long userId, @Param("currentDate") LocalDate currentDate);

    @Query("""
        SELECT b FROM Booking b 
        JOIN FETCH b.schedule s 
        JOIN FETCH s.train t 
        WHERE b.id = :bookingId AND b.user.id = :userId
        """)
    Optional<Booking> findBookingDetailsByIdAndUserId(@Param("bookingId") Long bookingId, @Param("userId") Long userId);

    // PNR Status Checking
    @Query("""
        SELECT b FROM Booking b 
        JOIN FETCH b.schedule s 
        JOIN FETCH s.train t 
        JOIN FETCH b.tickets 
        WHERE b.pnrNumber = :pnrNumber
        """)
    Optional<Booking> findByPnrNumberWithDetails(@Param("pnrNumber") String pnrNumber);

    // Admin Dashboard Stats
    @Query("SELECT COUNT(b) FROM Booking b WHERE DATE(b.bookingDate) = :date")
    Long countBookingsByDate(@Param("date") LocalDate date);
}
