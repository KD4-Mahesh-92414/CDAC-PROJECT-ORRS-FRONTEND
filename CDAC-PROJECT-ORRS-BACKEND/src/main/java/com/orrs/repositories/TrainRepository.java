package com.orrs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.dto.response.TrainAdminViewDTO;
import com.orrs.entities.Train;
import com.orrs.enums.TrainStatus;

public interface TrainRepository extends JpaRepository<Train, Long> {

    boolean existsByTrainNumber(String trainNumber);

    @Query("""
        select new com.orrs.dto.response.TrainAdminViewDTO(
            t.id,
            t.trainNumber,
            t.trainName,
            t.trainType,
            t.sourceStation.stationName,
            t.destinationStation.stationName,
            t.totalDistanceKm,
            t.avgSpeed,
            t.daysOfRun,
            t.trainStatus
        )
        from Train t
        
    """)
    List<TrainAdminViewDTO> fetchAllTrains();

    // Admin Dashboard Stats
    @Query("SELECT COUNT(t) FROM Train t WHERE t.trainStatus = :status")
    Long countByTrainStatus(@Param("status") TrainStatus status);

    // Get all active trains for scheduling
    @Query("SELECT t FROM Train t WHERE t.trainStatus = 'ACTIVE'")
    List<Train> findAllActiveTrains();
}

