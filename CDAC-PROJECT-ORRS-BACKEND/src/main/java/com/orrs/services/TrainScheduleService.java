package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.TrainSearchReqDTO;

public interface TrainScheduleService {

	ApiResponseDTO<?> searchTrains(TrainSearchReqDTO searchDto);

}
