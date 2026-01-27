package com.orrs.services;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orrs.custom_exceptions.ResourceAlreadyExistsException;
import com.orrs.custom_exceptions.ResourceNotFoundException;
import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AdminCreateUserReqDTO;
import com.orrs.dto.request.AdminUpdateUserReqDTO;
import com.orrs.dto.response.AdminUserRespDTO;
import com.orrs.entities.User;
import com.orrs.enums.AccountStatus;
import com.orrs.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public ApiResponseDTO<AdminUserRespDTO> getUserById(Long userId) {
        
        User user = userRepository.findById(userId)
                .filter(u -> u.getStatus() != AccountStatus.DELETED)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        AdminUserRespDTO userResp = modelMapper.map(user, AdminUserRespDTO.class);
        
        return new ApiResponseDTO<>("User details retrieved successfully", "SUCCESS", userResp);
    }

    @Override
    public ApiResponseDTO<AdminUserRespDTO> createUser(AdminCreateUserReqDTO reqDTO) {
        
        // Validate unique constraints
        if (userRepository.existsByEmail(reqDTO.getEmail())) {
            throw new ResourceAlreadyExistsException("Email address is already registered");
        }
        
        if (userRepository.existsByMobile(reqDTO.getMobile())) {
            throw new ResourceAlreadyExistsException("Mobile number is already registered");
        }
        
        if (reqDTO.getAadharNo() != null && !reqDTO.getAadharNo().trim().isEmpty() 
                && userRepository.existsByAadharNo(reqDTO.getAadharNo())) {
            throw new ResourceAlreadyExistsException("Aadhaar number is already registered");
        }

        // Create new user
        User user = modelMapper.map(reqDTO, User.class);
        
        // Set default password (user can change later)
        String defaultPassword = "User@123"; // You can make this configurable
        user.setPassword(passwordEncoder.encode(defaultPassword));

        User savedUser = userRepository.save(user);
        AdminUserRespDTO userResp = modelMapper.map(savedUser, AdminUserRespDTO.class);

        return new ApiResponseDTO<>("User created successfully", "SUCCESS", userResp);
    }

    @Override
    public ApiResponseDTO<AdminUserRespDTO> updateUser(Long userId, AdminUpdateUserReqDTO reqDTO) {
        
        User user = userRepository.findById(userId)
                .filter(u -> u.getStatus() != AccountStatus.DELETED)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Validate unique constraints (excluding current user)
        if (!reqDTO.getEmail().equals(user.getEmail()) && userRepository.existsByEmail(reqDTO.getEmail())) {
            throw new ResourceAlreadyExistsException("Email address is already registered");
        }
        
        if (!reqDTO.getMobile().equals(user.getMobile()) && userRepository.existsByMobile(reqDTO.getMobile())) {
            throw new ResourceAlreadyExistsException("Mobile number is already registered");
        }
        
        if (reqDTO.getAadharNo() != null && !reqDTO.getAadharNo().trim().isEmpty() 
                && !reqDTO.getAadharNo().equals(user.getAadharNo()) 
                && userRepository.existsByAadharNo(reqDTO.getAadharNo())) {
            throw new ResourceAlreadyExistsException("Aadhaar number is already registered");
        }

        // Update user details
        modelMapper.map(reqDTO, user);
        
        User updatedUser = userRepository.save(user);
        AdminUserRespDTO userResp = modelMapper.map(updatedUser, AdminUserRespDTO.class);

        return new ApiResponseDTO<>("User updated successfully", "SUCCESS", userResp);
    }

    @Override
    public ApiResponseDTO<String> deleteUser(Long userId) {
        
        User user = userRepository.findById(userId)
                .filter(u -> u.getStatus() != AccountStatus.DELETED)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Soft delete - mark as deleted and modify email/mobile to allow re-registration
        user.setStatus(AccountStatus.DELETED);
        user.setEmail("deleted_" + user.getEmail() + "@system.local");
        user.setMobile("XX" + user.getMobile());
        
        userRepository.save(user);

        return new ApiResponseDTO<>("User deleted successfully", "SUCCESS", "User account has been deleted");
    }
}