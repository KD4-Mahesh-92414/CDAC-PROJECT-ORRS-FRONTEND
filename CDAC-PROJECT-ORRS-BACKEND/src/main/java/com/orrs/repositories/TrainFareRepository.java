package com.orrs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orrs.entities.TrainFare;

public interface TrainFareRepository extends JpaRepository<TrainFare, Long> {

	List<TrainFare> findByTrainId(Long trainId);
	
}
