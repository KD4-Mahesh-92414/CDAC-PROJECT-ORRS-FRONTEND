package com.orrs.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.orrs.custom_exceptions.InvalidRequestException;
import com.orrs.custom_exceptions.PasswordMismatchException;
import com.orrs.custom_exceptions.ResourceAlreadyExistsException;
import com.orrs.custom_exceptions.ResourceNotFoundException;
import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.RegisterReqDTO;
import com.orrs.dto.request.UpdatePasswordReqDTO;
import com.orrs.dto.request.UpdateUserReqDTO;
import com.orrs.dto.response.RegisterRespDTO;
import com.orrs.dto.response.UserDetailsRespDTO;
import com.orrs.entities.User;
import com.orrs.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepo;
	private final ModelMapper modelMapper;

	@Override
	public ApiResponseDTO<?> registerNewUser(RegisterReqDTO regDto) {
		if(userRepo.existsByEmail(regDto.getEmail())) {
			throw new ResourceAlreadyExistsException("Email address is already registered");
		}
		if(userRepo.existsByMobile(regDto.getMobile())) {
			throw new ResourceAlreadyExistsException("Mobile number is already registered");
		}
		if(!regDto.getPassword().equals(regDto.getCnfPassword())) {
			throw new PasswordMismatchException("Password and confirm password do not match");
		}
		
		User user = modelMapper.map(regDto, User.class);
		User persistedUser = userRepo.save(user);
		return new ApiResponseDTO<RegisterRespDTO>("User registered successfully", "SUCCESS", new RegisterRespDTO(persistedUser.getId()));
	}

	@Override
	public ApiResponseDTO<?> getUserDetails(Long id) {
		User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User does not exist"));
		UserDetailsRespDTO userDetailsDto = modelMapper.map(user, UserDetailsRespDTO.class);
		return new ApiResponseDTO<UserDetailsRespDTO>("User details fetched successfully", "SUCCESS", userDetailsDto);
	}


	@Override
	public ApiResponseDTO<?> updateUserDetails(UpdateUserReqDTO updatedUserDto, Long userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User does not exist"));
		if(!updatedUserDto.getEmail().equals(user.getEmail()) && userRepo.existsByEmail(updatedUserDto.getEmail())) {
			throw new ResourceAlreadyExistsException("Email address is already registered");
		}
		if(!updatedUserDto.getMobile().equals(user.getMobile()) && userRepo.existsByMobile(updatedUserDto.getMobile())) {
			throw new ResourceAlreadyExistsException("Mobile number is already registered");
		}
		
		modelMapper.map(updatedUserDto, user); // model_mapper mapping to a existing entity 
		UserDetailsRespDTO resp = modelMapper.map(user, UserDetailsRespDTO.class);
		return new ApiResponseDTO<UserDetailsRespDTO>("User details updated successfully", "SUCCESS", resp);
	}

	@Override
	public ApiResponseDTO<?> updateUserPassword(UpdatePasswordReqDTO passwordDto, Long userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User does not exist"));
		if(!user.getPassword().equals(passwordDto.getPassword())) {
			throw new PasswordMismatchException("Old password does not match");
		}
		if(!passwordDto.getNewPassword().equals(passwordDto.getNewCnfPassword())) {
			throw new PasswordMismatchException("New password and confirm password do not match");
		}
		
		if(passwordDto.getPassword().equals(user.getPassword())) {
			throw new InvalidRequestException("New passowrd must be different from old password");
		}
		user.setPassword(passwordDto.getNewPassword());
		return new ApiResponseDTO<>("Password updated successfully","SUCCESS",null) ;
	}
	
}
