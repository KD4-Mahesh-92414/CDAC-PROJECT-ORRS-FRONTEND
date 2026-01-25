package com.orrs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.entities.Booking;
import com.orrs.enums.BookingStatus;

public interface BookingRespository  extends JpaRepository<Booking, Long>{
	
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

}
