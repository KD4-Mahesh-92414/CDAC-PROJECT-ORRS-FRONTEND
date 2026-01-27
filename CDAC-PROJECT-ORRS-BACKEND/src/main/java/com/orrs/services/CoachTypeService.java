package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AddCoachTypeReqDTO;
import com.orrs.dto.request.UpdateCoachTypeReqDTO;

public interface CoachTypeService {

    // Add new coach type (ADMIN)
    ApiResponseDTO<?> addCoachType(AddCoachTypeReqDTO addCoachTypeReqDTO);

    // Get all coach types (ADMIN)
    ApiResponseDTO<?> getAllCoachTypes();

    // Update coach type details (ADMIN)
    ApiResponseDTO<?> updateCoachType(Long coachTypeId, UpdateCoachTypeReqDTO updateCoachTypeReqDTO);

    // Delete coach type (ADMIN)
    ApiResponseDTO<?> deleteCoachType(Long coachTypeId);
}