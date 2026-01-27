package com.orrs.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.orrs.dto.response.SeatLayoutAdminViewDTO;
import com.orrs.entities.SeatLayout;

public interface SeatLayoutRepository extends JpaRepository<SeatLayout, Long> {
	
	// Fetches the template (1-72) for a specific coach type
    List<SeatLayout> findByCoachType_IdOrderBySeatNumberAsc(Long coachTypeId);

    Optional<SeatLayout> findByCoachTypeIdAndSeatNumber(Long coachTypeId, Integer seatNumber);
    
    @Query("""
        select new com.orrs.dto.response.SeatLayoutAdminViewDTO(
            sl.id,
            sl.coachType.id,
            sl.coachType.typeCode,
            sl.coachType.typeName,
            sl.seatNumber,
            sl.seatType
        )
        from SeatLayout sl
    """)
    List<SeatLayoutAdminViewDTO> fetchAllSeatLayouts();
}