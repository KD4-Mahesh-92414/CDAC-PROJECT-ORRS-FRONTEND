package com.orrs.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.dto.response.SearchResultRespDTO;
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
}
