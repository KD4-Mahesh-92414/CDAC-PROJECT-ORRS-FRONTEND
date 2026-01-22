package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.RegisterReqDTO;
import com.orrs.dto.request.UpdatePasswordReqDTO;
import com.orrs.dto.request.UpdateStatusReqDTO;
import com.orrs.dto.request.UpdateUserReqDTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;


public interface UserService {

	ApiResponseDTO<?> registerNewUser(RegisterReqDTO regDto);

	ApiResponseDTO<?> getUserDetails(Long id);

	ApiResponseDTO<?> updateUserDetails(UpdateUserReqDTO updatedUserDto,Long userId);

	ApiResponseDTO<?> updateUserPassword(UpdatePasswordReqDTO passwordDto, Long userId);

	ApiResponseDTO<?> getAllUsers();

	ApiResponseDTO<?> suspendUserById(Long userId);

	ApiResponseDTO<?> deleteAccount(Long userId);

	ApiResponseDTO<?> updateUserStatus(Long userId, UpdateStatusReqDTO dto);

}
