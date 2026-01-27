package com.orrs.repositories;

import java.time.LocalTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.entities.TrainRoute;

public interface TrainRouteRepository extends JpaRepository<TrainRoute, Long> {

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

    @Query("""
        SELECT tr 
        FROM TrainRoute tr 
        WHERE tr.train.id = :trainId 
        ORDER BY tr.sequenceNo
        """)
    java.util.List<TrainRoute> findByTrainIdOrderBySequenceNo(@Param("trainId") Long trainId);
}