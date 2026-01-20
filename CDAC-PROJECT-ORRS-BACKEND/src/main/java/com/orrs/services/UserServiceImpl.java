package com.orrs.services;

import org.springframework.stereotype.Service;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.RegisterDTO;
import com.orrs.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepo;

	@Override
	public ApiResponseDTO<?> registerNewUser(RegisterDTO regDto) {
		
		return null;
	}
	
}
