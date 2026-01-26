package com.orrs.repositories;

import java.util.List;

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
    
 // Fetches physical coaches (S1, S2, etc.) for a specific train and class
    @Query("SELECT tc FROM TrainCoach tc WHERE tc.train.id = :trainId AND tc.coachType.id = :coachTypeId ORDER BY tc.coachLabel ASC")
    List<TrainCoach> findByTrainIdAndCoachTypeId(@Param("trainId") Long trainId, @Param("coachTypeId") Long coachTypeId);
    
 // Check if train has specific coach type
    boolean existsByTrainIdAndCoachTypeId(Long trainId, Long coachTypeId);

    // Check if specific coach label exists for train and coach type
    boolean existsByTrainIdAndCoachTypeIdAndCoachLabel(Long trainId, Long coachTypeId, String coachLabel);
}

