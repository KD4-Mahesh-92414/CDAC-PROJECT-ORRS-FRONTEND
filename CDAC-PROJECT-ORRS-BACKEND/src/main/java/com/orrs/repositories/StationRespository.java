package com.orrs.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orrs.entities.Station;

public interface StationRespository extends JpaRepository<Station, Long> {

	Optional<Station> findByStationNameIgnoreCase(String name);
}
