package com.orrs.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.orrs.dto.response.StationAdminViewDTO;
import com.orrs.entities.Station;

public interface StationRepository extends JpaRepository<Station, Long> {

    boolean existsByStationCode(String stationCode);

    Optional<Station> findByStationCode(String stationCode);

    Optional<Station> findByStationNameIgnoreCase(String name);

    @Query("""
        select new com.orrs.dto.response.StationAdminViewDTO(
            s.id, s.stationCode, s.stationName, s.city, s.state, s.zone, s.status
        )
        from Station s

    """)
    List<StationAdminViewDTO> fetchAllStations();
}
