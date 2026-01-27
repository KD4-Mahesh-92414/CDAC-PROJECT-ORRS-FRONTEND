package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.PNRStatusReqDTO;
import com.orrs.dto.response.PNRStatusRespDTO;

public interface PNRStatusService {
    
    ApiResponseDTO<PNRStatusRespDTO> checkPNRStatus(PNRStatusReqDTO reqDTO);
}