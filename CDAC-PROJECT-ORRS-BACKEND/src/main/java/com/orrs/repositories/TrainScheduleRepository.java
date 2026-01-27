package com.orrs.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.dto.response.SearchResultRespDTO;
import com.orrs.dto.response.TrainStatusRespDTO;
import com.orrs.entities.TrainSchedule;
import com.orrs.enums.ScheduleStatus;

public interface TrainScheduleRepository extends JpaRepository<TrainSchedule, Long>{

	@Query("""
		    SELECT new com.orrs.dto.response.SearchResultRespDTO(
		        t.id, 
		        ts.id, 
		        t.trainNumber, 
		        t.trainName, 
		        srcRoute.station.stationName, 
		        destRoute.station.stationName,
		        srcRoute.departureTime, 
		        destRoute.arrivalTime,
		        CAST(
            FUNCTION('TIMESTAMPDIFF', MINUTE, srcRoute.departureTime, destRoute.arrivalTime)
            AS integer
        ),
		        cast((destRoute.distanceFromSource - srcRoute.distanceFromSource) as integer),
		        t.daysOfRun,
		        null
		    )
		    FROM TrainSchedule ts
		    JOIN ts.train t
		    JOIN TrainRoute srcRoute ON t.id = srcRoute.train.id
		    JOIN TrainRoute destRoute ON t.id = destRoute.train.id
		    WHERE srcRoute.station.id = :sourceId
		    AND destRoute.station.id = :destId
		    AND srcRoute.sequenceNo < destRoute.sequenceNo
		    AND ts.departureDate = :journeyDate
		    AND ts.status = :status
		    """)
		List<SearchResultRespDTO> findAvailableTrains(
		    @Param("sourceId") Long sourceId,
		    @Param("destId") Long destId,
		    @Param("journeyDate") LocalDate journeyDate,
		    @Param("status") ScheduleStatus status  
		);

    // Get cancelled and rescheduled trains
    @Query("""
        SELECT new com.orrs.dto.response.TrainStatusRespDTO(
            ts.id, t.trainNumber, t.trainName,
            CONCAT(t.sourceStation.stationName, ' → ', t.destinationStation.stationName),
            ts.departureDate, ts.status, ts.delayReason, ts.remarks
        )
        FROM TrainSchedule ts
        JOIN ts.train t
        WHERE ts.status IN ('CANCELLED', 'RESCHEDULED')
        AND ts.departureDate >= :fromDate
        ORDER BY ts.departureDate DESC
        """)
    List<TrainStatusRespDTO> findCancelledAndRescheduledTrains(@Param("fromDate") LocalDate fromDate);

    // Check if schedule exists for train and date
    @Query("SELECT COUNT(ts) > 0 FROM TrainSchedule ts WHERE ts.train.id = :trainId AND ts.departureDate = :date")
    boolean existsByTrainIdAndDate(@Param("trainId") Long trainId, @Param("date") LocalDate date);

    // Count scheduled trains
    @Query("SELECT COUNT(ts) FROM TrainSchedule ts WHERE ts.departureDate >= :fromDate")
    Long countScheduledTrainsFromDate(@Param("fromDate") LocalDate fromDate);
}
