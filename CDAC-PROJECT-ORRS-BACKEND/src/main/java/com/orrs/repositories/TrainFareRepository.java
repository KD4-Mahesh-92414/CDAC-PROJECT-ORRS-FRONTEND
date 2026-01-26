package com.orrs.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.entities.TrainFare;

public interface TrainFareRepository extends JpaRepository<TrainFare, Long> {

	List<TrainFare> findByTrainId(Long trainId);
	
	@Query("""
		SELECT tf FROM TrainFare tf
		WHERE tf.train.id = :trainId
		AND tf.coachType.id = :coachTypeId
		""")
	Optional<TrainFare> findByTrainIdAndCoachTypeId(@Param("trainId") Long trainId,
													@Param("coachTypeId") Long coachTypeId);
	
}
