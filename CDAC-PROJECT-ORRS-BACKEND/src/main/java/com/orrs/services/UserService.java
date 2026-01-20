package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.RegisterDTO;

public interface UserService {

	ApiResponseDTO<?> registerNewUser(RegisterDTO regDto);

}
