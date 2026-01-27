package com.orrs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.orrs.dto.response.CoachTypeAdminViewDTO;
import com.orrs.entities.CoachType;

public interface CoachTypeRepository extends JpaRepository<CoachType, Long> {

    boolean existsByTypeCode(String typeCode);
    
    @Query("""
        select new com.orrs.dto.response.CoachTypeAdminViewDTO(
            ct.id,
            ct.typeCode,
            ct.typeName,
            ct.totalSeats,
            ct.coachImageUrl,
            ct.description
        )
        from CoachType ct
    """)
    List<CoachTypeAdminViewDTO> fetchAllCoachTypes();
}
