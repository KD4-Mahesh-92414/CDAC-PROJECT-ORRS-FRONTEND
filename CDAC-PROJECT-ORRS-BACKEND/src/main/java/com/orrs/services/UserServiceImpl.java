package com.orrs.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.orrs.custom_exceptions.InvalidRequestException;
import com.orrs.custom_exceptions.PasswordMismatchException;
import com.orrs.custom_exceptions.ResourceAlreadyExistsException;
import com.orrs.custom_exceptions.ResourceNotFoundException;
import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.RegisterReqDTO;
import com.orrs.dto.request.UpdatePasswordReqDTO;
import com.orrs.dto.request.UpdateStatusReqDTO;
import com.orrs.dto.request.UpdateUserReqDTO;
import com.orrs.dto.response.UserAdminViewDTO;
import com.orrs.dto.response.RegisterRespDTO;
import com.orrs.dto.response.UserDetailsRespDTO;
import com.orrs.entities.User;
import com.orrs.enums.AccountStatus;
import com.orrs.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepo;
	private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
 
	//centralized valid user checking 
	private User getValidUser(Long userId) {
		User user = userRepo.findById(userId)
				.filter((u)-> u.getStatus() != AccountStatus.DELETED)
				.orElseThrow(() -> new ResourceNotFoundException("User does not exist"));
		if(user.getStatus() == AccountStatus.SUSPENDED) {
			throw new InvalidRequestException("Your account has been suspended. Please contact support.");
		}
		return user;//active user
	}
	
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
		//Encoding (Using regDto directly is often clearer)
		String encodedPassword = passwordEncoder.encode(regDto.getPassword());
		user.setPassword(encodedPassword);
		User persistedUser = userRepo.save(user);
		
		return new ApiResponseDTO<RegisterRespDTO>("User registered successfully", "SUCCESS", new RegisterRespDTO(persistedUser.getId()));
	}

	@Override
	public ApiResponseDTO<?> getUserDetails(Long id) {
		User user = userRepo.findById(id)
				.filter((u)-> u.getStatus() != AccountStatus.DELETED)
				.orElseThrow(() -> new ResourceNotFoundException("User does not exist"));
		
		UserDetailsRespDTO userDetailsDto = modelMapper.map(user, UserDetailsRespDTO.class);
		return new ApiResponseDTO<UserDetailsRespDTO>("User details fetched successfully", "SUCCESS", userDetailsDto);
	}


	@Override
	public ApiResponseDTO<?> updateUserDetails(UpdateUserReqDTO updatedUserDto, Long userId) {
		User user = getValidUser(userId);
		
		if(!updatedUserDto.getEmail().equals(user.getEmail()) && userRepo.existsByEmail(updatedUserDto.getEmail())) {
			throw new ResourceAlreadyExistsException("Email address is already registered");
		}
		if(!updatedUserDto.getMobile().equals(user.getMobile()) && userRepo.existsByMobile(updatedUserDto.getMobile())) {
			throw new ResourceAlreadyExistsException("Mobile number is already registered");
		}
		if(!updatedUserDto.getAadharNo().equals(user.getAadharNo()) && userRepo.existsByAadharNo(updatedUserDto.getAadharNo())) {
			throw new ResourceAlreadyExistsException("An account with this Aadhaar number already exists.");
		}
		
		modelMapper.map(updatedUserDto, user); // model_mapper mapping to a existing entity 
		UserDetailsRespDTO resp = modelMapper.map(user, UserDetailsRespDTO.class);
		return new ApiResponseDTO<UserDetailsRespDTO>("User details updated successfully", "SUCCESS", resp);
	}

	@Override
	public ApiResponseDTO<?> updateUserPassword(UpdatePasswordReqDTO passwordDto, Long userId) {
		User user = getValidUser(userId);
		
		if(!user.getPassword().equals(passwordDto.getPassword())) {
			throw new PasswordMismatchException("Old password does not match");
		}
		if(!passwordDto.getNewPassword().equals(passwordDto.getNewCnfPassword())) {
			throw new PasswordMismatchException("New password and confirm password do not match");
		}
		//bug fixed passwordDto.getPassword().equals(user.getPassword() to passwordDto.getNewPassword().equals(user.getPassword()
		if(passwordDto.getNewPassword().equals(user.getPassword())) {
			throw new InvalidRequestException("New passowrd must be different from old password");
		}
		user.setPassword(passwordEncoder.encode(passwordDto.getNewPassword()));
		return new ApiResponseDTO<>("Password updated successfully","SUCCESS",null) ;
	}

	@Override
	public ApiResponseDTO<?> getAllUsers() {
		List<UserAdminViewDTO> userList =  userRepo.fetchAllUsers(AccountStatus.DELETED);
		return new ApiResponseDTO<List<UserAdminViewDTO>>("All users details fetched successfully", "SUCCESS", userList );
	}

	@Override
	public ApiResponseDTO<?> suspendUserById(Long userId) {
		User persistedUser = userRepo.findById(userId)
				.filter((u)-> u.getStatus() != AccountStatus.DELETED )
				.orElseThrow(()-> new ResourceNotFoundException("User does not exist"));
		//deleted user account should not be suspended 
//		if(persistedUser.getStatus() == AccountStatus.DELETED) {
//			throw new ResourceNotFoundException("User does not exist");
//		}
		persistedUser.setStatus(AccountStatus.SUSPENDED);
		return new ApiResponseDTO<>("User account has been suspended successfully", "SUCCESS", null);
	}

	@Override
	public ApiResponseDTO<?> deleteAccount(Long userId) {
		User persistedUser = getValidUser(userId);
		
		persistedUser.setStatus(AccountStatus.DELETED);
		persistedUser.setEmail("deleted_"+persistedUser.getEmail()+"@system.local");
		persistedUser.setMobile("XX"+persistedUser.getMobile());
//		If a deleted user’s email/mobile was modified during delete (which you already do), then:
//			Re-registration using original email/mobile will work
//			No change required here
		return new ApiResponseDTO<>("User account deleted successfully", "SUCCESS", null);
	}

	@Override
	public ApiResponseDTO<?> updateUserStatus(Long userId, UpdateStatusReqDTO dto) {
		User user = userRepo.findById(userId)
				.filter((u)-> u.getStatus() != AccountStatus.DELETED )
				.orElseThrow(()-> new ResourceNotFoundException("User does not exist"));
		user.setStatus(dto.getStatus());
		return new ApiResponseDTO<>("User account status updated successfully", "SUCCESS", null);
	}


	
	
}
