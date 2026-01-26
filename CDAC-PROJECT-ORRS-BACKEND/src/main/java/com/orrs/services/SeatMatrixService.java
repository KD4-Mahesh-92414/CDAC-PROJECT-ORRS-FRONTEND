package com.orrs.services;

import java.util.List;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.SeatMatrixReqDTO;
import com.orrs.dto.response.SeatMatrixRespDTO;

public interface SeatMatrixService {

	 ApiResponseDTO<List<SeatMatrixRespDTO>> getSeatMatrix(SeatMatrixReqDTO reqDTO, Long userId);
}
