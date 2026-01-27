package com.orrs.services;

import java.util.List;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.response.TrainStatusRespDTO;

public interface TrainStatusService {
    
    ApiResponseDTO<List<TrainStatusRespDTO>> getCancelledAndRescheduledTrains();
}