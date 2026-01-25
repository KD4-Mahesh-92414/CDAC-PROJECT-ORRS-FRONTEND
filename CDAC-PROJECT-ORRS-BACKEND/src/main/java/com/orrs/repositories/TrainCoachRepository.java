package com.orrs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.entities.TrainCoach;

public interface TrainCoachRepository extends JpaRepository<TrainCoach, Long> {

	// Calculates total seats: (Number of coaches of this type) * (Seats per coach)
    @Query("""
        SELECT SUM(ct.totalSeats) 
        FROM TrainCoach tc 
        JOIN tc.coachType ct 
        WHERE tc.train.id = :trainId 
        AND ct.id = :coachTypeId
        AND tc.isActive = true
        """)
    Integer countTotalSeats(@Param("trainId") Long trainId, @Param("coachTypeId") Long coachTypeId);
    
}
