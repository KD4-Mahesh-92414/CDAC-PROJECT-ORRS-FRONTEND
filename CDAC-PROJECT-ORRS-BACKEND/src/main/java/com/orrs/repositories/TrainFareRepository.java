package com.orrs.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.entities.CoachType;
import com.orrs.entities.TrainFare;

public interface TrainFareRepository extends JpaRepository<TrainFare, Long> {

	List<TrainFare> findByTrainId(Long trainId);
	
	Optional<TrainFare> findByTrainIdAndCoachTypeIdAndIsDeletedFalse(Long trainId, Long coachTypeId);
	
	List<TrainFare> findAllByIsDeletedFalse();
	
	List<TrainFare> findAllByTrainIdAndIsDeletedFalse(Long trainId);
	
	boolean existsByCoachType(CoachType coachType);
	
	@Query("SELECT new com.orrs.dto.response.TrainFareAdminViewDTO(" +
		   "tf.id, tf.train.id, tf.train.trainNumber, tf.train.trainName, " +
		   "tf.coachType.typeCode, tf.ratePerKm, tf.baseFare, tf.isActive) " +
		   "FROM TrainFare tf WHERE tf.isDeleted = false")
	List<com.orrs.dto.response.TrainFareAdminViewDTO> fetchAllTrainFares();
	@Query("""
		SELECT tf FROM TrainFare tf
		WHERE tf.train.id = :trainId
		AND tf.coachType.id = :coachTypeId
		""")
	Optional<TrainFare> findByTrainIdAndCoachTypeId(@Param("trainId") Long trainId,
													@Param("coachTypeId") Long coachTypeId);
	
}
