package com.orrs.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.orrs.custom_exceptions.BusinessLogicException;
import com.orrs.custom_exceptions.ResourceAlreadyExistsException;
import com.orrs.custom_exceptions.ResourceNotFoundException;
import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AddCoachTypeReqDTO;
import com.orrs.dto.request.UpdateCoachTypeReqDTO;
import com.orrs.dto.response.CoachTypeAdminViewDTO;
import com.orrs.entities.CoachType;
import com.orrs.repositories.CoachTypeRepository;
import com.orrs.repositories.TrainFareRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CoachTypeServiceImpl implements CoachTypeService {

    private final CoachTypeRepository coachTypeRepo;
    private final TrainFareRepository trainFareRepo;
    private final ModelMapper modelMapper;

    // centralized valid coach type check
    private CoachType getValidCoachType(Long coachTypeId) {
        return coachTypeRepo.findById(coachTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Coach type does not exist"));
    }

    @Override
    public ApiResponseDTO<?> addCoachType(AddCoachTypeReqDTO dto) {

        if (coachTypeRepo.existsByTypeCode(dto.getTypeCode())) {
            throw new ResourceAlreadyExistsException("Coach type with this code already exists");
        }

        CoachType coachType = modelMapper.map(dto, CoachType.class);
        coachTypeRepo.save(coachType);

        return new ApiResponseDTO<>("Coach type added successfully", "SUCCESS", null);
    }

    @Override
    public ApiResponseDTO<?> getAllCoachTypes() {

        List<CoachTypeAdminViewDTO> coachTypes = coachTypeRepo.fetchAllCoachTypes();
        return new ApiResponseDTO<>("All coach types fetched successfully", "SUCCESS", coachTypes);
    }

    @Override
    public ApiResponseDTO<?> updateCoachType(Long coachTypeId, UpdateCoachTypeReqDTO dto) {

        CoachType coachType = getValidCoachType(coachTypeId);

        if (!dto.getTypeCode().equals(coachType.getTypeCode())
                && coachTypeRepo.existsByTypeCode(dto.getTypeCode())) {
            throw new ResourceAlreadyExistsException("Coach type with this code already exists");
        }

        modelMapper.map(dto, coachType);

        return new ApiResponseDTO<>("Coach type updated successfully", "SUCCESS", null);
    }

    @Override
    public ApiResponseDTO<?> deleteCoachType(Long coachTypeId) {

        CoachType coachType = getValidCoachType(coachTypeId);
        
        // Check if coach type is referenced by train fares
        if (trainFareRepo.existsByCoachType(coachType)) {
            throw new BusinessLogicException("Cannot delete coach type as it is being used by train fares. Please remove associated fares first.");
        }
        
        coachTypeRepo.delete(coachType);

        return new ApiResponseDTO<>("Coach type deleted successfully", "SUCCESS", null);
    }
}