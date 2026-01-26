package com.orrs.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.orrs.entities.SeatLayout;

public interface SeatLayoutRepository extends JpaRepository<SeatLayout, Long> {
    // Fetches the template (1-72) for a specific coach type
    List<SeatLayout> findByCoachType_IdOrderBySeatNumberAsc(Long coachTypeId);
}