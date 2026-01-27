package com.orrs.repositories;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.dto.response.TrainRouteAdminViewDTO;
import com.orrs.entities.TrainRoute;

public interface TrainRouteRepository extends JpaRepository<TrainRoute, Long> {

    Optional<TrainRoute> findByTrainIdAndSequenceNo(Long trainId, Integer sequenceNo);
    
    Optional<TrainRoute> findByTrainIdAndStationId(Long trainId, Long stationId);
    
    @Query("""
        select new com.orrs.dto.response.TrainRouteAdminViewDTO(
            tr.id,
            tr.train.id,
            tr.train.trainNumber,
            tr.train.trainName,
            tr.station.id,
            tr.station.stationCode,
            tr.station.stationName,
            tr.sequenceNo,
            tr.arrivalTime,
            tr.departureTime,
            tr.haltMinutes,
            tr.distanceFromSource,
            tr.dayNumber,
            tr.isMajorStation,
            tr.stopType
        )
        from TrainRoute tr
    """)
    List<TrainRouteAdminViewDTO> fetchAllTrainRoutes();
    
    @Query("""
            SELECT tr 
            FROM TrainRoute tr 
            WHERE tr.train.id = :trainId 
            ORDER BY tr.sequenceNo
            """)
        java.util.List<TrainRoute> findByTrainIdOrderBySequenceNo(@Param("trainId") Long trainId);
    
    @Query("""

            SELECT tr.departureTime
            FROM TrainRoute tr
            WHERE tr.train.id = :trainId
            AND tr.station.id = :stationId
           """)
        Optional<LocalTime> findDepartureTimeByTrainAndStation(@Param("trainId") Long trainId, @Param("stationId") Long stationId);

        @Query("""
            SELECT tr.arrivalTime
            FROM TrainRoute tr
            WHERE tr.train.id = :trainId
            AND tr.station.id = :stationId
            """)
        Optional<LocalTime> findArrivalTimeByTrainAndStation(@Param("trainId") Long trainId, @Param("stationId") Long stationId);
        
}

