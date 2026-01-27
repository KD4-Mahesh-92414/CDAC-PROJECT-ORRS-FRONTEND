package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AdminCreateUserReqDTO;
import com.orrs.dto.request.AdminUpdateUserReqDTO;
import com.orrs.dto.response.AdminUserRespDTO;

public interface AdminUserService {
    
    ApiResponseDTO<AdminUserRespDTO> getUserById(Long userId);
    
    ApiResponseDTO<AdminUserRespDTO> createUser(AdminCreateUserReqDTO reqDTO);
    
    ApiResponseDTO<AdminUserRespDTO> updateUser(Long userId, AdminUpdateUserReqDTO reqDTO);
    
    ApiResponseDTO<String> deleteUser(Long userId);
}