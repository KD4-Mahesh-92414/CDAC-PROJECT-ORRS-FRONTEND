package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AddTrainRouteReqDTO;
import com.orrs.dto.request.UpdateTrainRouteReqDTO;

public interface TrainRouteService {

    // Add new train route (ADMIN)
    ApiResponseDTO<?> addTrainRoute(AddTrainRouteReqDTO addTrainRouteReqDTO);

    // Get all train routes (ADMIN)
    ApiResponseDTO<?> getAllTrainRoutes();

    // Update train route details (ADMIN)
    ApiResponseDTO<?> updateTrainRoute(Long trainRouteId, UpdateTrainRouteReqDTO updateTrainRouteReqDTO);

    // Delete train route (ADMIN)
    ApiResponseDTO<?> deleteTrainRoute(Long trainRouteId);
}