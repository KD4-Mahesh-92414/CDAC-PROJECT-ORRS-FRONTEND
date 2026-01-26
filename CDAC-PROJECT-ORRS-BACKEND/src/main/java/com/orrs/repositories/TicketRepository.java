package com.orrs.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.orrs.entities.Ticket;
import com.orrs.enums.BookingStatus;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // Fetches ONLY the coach label and seat number for confirmed bookings.
    // Enum is passed as a parameter to avoid JPQL syntax errors.
    @Query("""
        SELECT t.coachLabel, t.seatNumber 
        FROM Ticket t 
        JOIN t.booking b 
        WHERE b.schedule.id = :scheduleId 
        AND b.coachType.id = :coachTypeId 
        AND b.status = :status
        """)
    List<Object[]> findBookedSeats(
        @Param("scheduleId") Long scheduleId, 
        @Param("coachTypeId") Long coachTypeId,
        @Param("status") BookingStatus status
    );

    // Fetches booked seats for specific journey segment (station to station)
    // This considers only bookings that overlap with the requested journey
    @Query("""
        SELECT t.coachLabel, t.seatNumber 
        FROM Ticket t 
        JOIN t.booking b 
        WHERE b.schedule.id = :scheduleId 
        AND b.coachType.id = :coachTypeId 
        AND b.status = :status
        AND (
            (b.sourceStation.id <= :sourceStationId AND b.destinationStation.id > :sourceStationId) OR
            (b.sourceStation.id < :destinationStationId AND b.destinationStation.id >= :destinationStationId) OR
            (b.sourceStation.id >= :sourceStationId AND b.destinationStation.id <= :destinationStationId)
        )
        """)
    List<Object[]> findBookedSeatsForJourneySegment(
        @Param("scheduleId") Long scheduleId, 
        @Param("coachTypeId") Long coachTypeId,
        @Param("sourceStationId") Long sourceStationId,
        @Param("destinationStationId") Long destinationStationId,
        @Param("status") BookingStatus status
    );
}
