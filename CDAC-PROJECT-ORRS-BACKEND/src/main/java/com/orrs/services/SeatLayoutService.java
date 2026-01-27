package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AddSeatLayoutReqDTO;
import com.orrs.dto.request.UpdateSeatLayoutReqDTO;

public interface SeatLayoutService {

    // Add new seat layout (ADMIN)
    ApiResponseDTO<?> addSeatLayout(AddSeatLayoutReqDTO addSeatLayoutReqDTO);

    // Get all seat layouts (ADMIN)
    ApiResponseDTO<?> getAllSeatLayouts();

    // Update seat layout details (ADMIN)
    ApiResponseDTO<?> updateSeatLayout(Long seatLayoutId, UpdateSeatLayoutReqDTO updateSeatLayoutReqDTO);

    // Delete seat layout (ADMIN)
    ApiResponseDTO<?> deleteSeatLayout(Long seatLayoutId);
}