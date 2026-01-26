package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AddTrainReqDTO;
import com.orrs.dto.request.UpdateTrainReqDTO;
import com.orrs.dto.request.UpdateTrainStatusReqDTO;
import com.orrs.enums.TrainStatus;

public interface TrainService {

    // Add new train (ADMIN)
    ApiResponseDTO<?> addTrain(AddTrainReqDTO trainReqDTO);

    // Get all trains (ADMIN)
    ApiResponseDTO<?> getAllTrains();

    // Update train details (ADMIN)
    ApiResponseDTO<?> updateTrain(Long trainId, UpdateTrainReqDTO updateTrainReqDTO);
    
    // Update train status (ADMIN)
    ApiResponseDTO<?> updateTrainStatus(Long trainId, UpdateTrainStatusReqDTO updateTrainStatusReqDTO);


    // Soft delete train (ADMIN)
    ApiResponseDTO<?> deleteTrain(Long trainId);
}
