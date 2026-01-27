package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.response.AdminDashboardStatsRespDTO;

public interface AdminDashboardService {
    
    ApiResponseDTO<AdminDashboardStatsRespDTO> getDashboardStats();
}