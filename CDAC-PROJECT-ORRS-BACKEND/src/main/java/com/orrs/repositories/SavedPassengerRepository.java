package com.orrs.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.entities.SavedPassenger;

public interface SavedPassengerRepository extends JpaRepository<SavedPassenger, Long> {

    @Query("SELECT sp FROM SavedPassenger sp WHERE sp.user.id = :userId ORDER BY sp.name ASC")
    List<SavedPassenger> findByUserIdOrderByNameAsc(@Param("userId") Long userId);

    @Query("SELECT sp FROM SavedPassenger sp WHERE sp.id = :passengerId AND sp.user.id = :userId")
    Optional<SavedPassenger> findByIdAndUserId(@Param("passengerId") Long passengerId, @Param("userId") Long userId);

    @Query("SELECT COUNT(sp) FROM SavedPassenger sp WHERE sp.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
}