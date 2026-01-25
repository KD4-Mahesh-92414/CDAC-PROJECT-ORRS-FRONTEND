package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AddStationReqDTO;
import com.orrs.dto.request.UpdateStationReqDTO;

public interface StationService {

    // Add new station (ADMIN)
    ApiResponseDTO<?> addStation(AddStationReqDTO addStationReqDTO);

    // Get all stations (ADMIN)
    ApiResponseDTO<?> getAllStations();

    // Update station details (ADMIN)
    ApiResponseDTO<?> updateStation(Long stationId, UpdateStationReqDTO updateStationReqDTO);

    // Soft delete station (ADMIN)
    ApiResponseDTO<?> deleteStation(Long stationId);
}
