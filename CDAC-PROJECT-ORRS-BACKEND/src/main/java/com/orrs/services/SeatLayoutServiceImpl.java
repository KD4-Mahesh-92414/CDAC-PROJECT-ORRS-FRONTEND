package com.orrs.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.orrs.custom_exceptions.ResourceAlreadyExistsException;
import com.orrs.custom_exceptions.ResourceNotFoundException;
import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AddSeatLayoutReqDTO;
import com.orrs.dto.request.UpdateSeatLayoutReqDTO;
import com.orrs.dto.response.SeatLayoutAdminViewDTO;
import com.orrs.entities.CoachType;
import com.orrs.entities.SeatLayout;
import com.orrs.repositories.CoachTypeRepository;
import com.orrs.repositories.SeatLayoutRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SeatLayoutServiceImpl implements SeatLayoutService {

    private final SeatLayoutRepository seatLayoutRepo;
    private final CoachTypeRepository coachTypeRepo;
    private final ModelMapper modelMapper;

    // centralized valid seat layout check
    private SeatLayout getValidSeatLayout(Long seatLayoutId) {
        return seatLayoutRepo.findById(seatLayoutId)
                .orElseThrow(() -> new ResourceNotFoundException("Seat layout does not exist"));
    }

    @Override
    public ApiResponseDTO<?> addSeatLayout(AddSeatLayoutReqDTO dto) {

        if (seatLayoutRepo.findByCoachTypeIdAndSeatNumber(dto.getCoachTypeId(), dto.getSeatNumber()).isPresent()) {
            throw new ResourceAlreadyExistsException("Seat layout already exists for this coach type and seat number");
        }

        CoachType coachType = coachTypeRepo.findById(dto.getCoachTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("Coach type not found"));

        SeatLayout seatLayout = modelMapper.map(dto, SeatLayout.class);
        seatLayout.setCoachType(coachType);

        seatLayoutRepo.save(seatLayout);

        return new ApiResponseDTO<>("Seat layout added successfully", "SUCCESS", null);
    }

    @Override
    public ApiResponseDTO<?> getAllSeatLayouts() {

        List<SeatLayoutAdminViewDTO> seatLayouts = seatLayoutRepo.fetchAllSeatLayouts();
        return new ApiResponseDTO<>("All seat layouts fetched successfully", "SUCCESS", seatLayouts);
    }

    @Override
    public ApiResponseDTO<?> updateSeatLayout(Long seatLayoutId, UpdateSeatLayoutReqDTO dto) {

        SeatLayout seatLayout = getValidSeatLayout(seatLayoutId);

        if ((!dto.getCoachTypeId().equals(seatLayout.getCoachType().getId()) || 
             !dto.getSeatNumber().equals(seatLayout.getSeatNumber())) &&
            seatLayoutRepo.findByCoachTypeIdAndSeatNumber(dto.getCoachTypeId(), dto.getSeatNumber()).isPresent()) {
            throw new ResourceAlreadyExistsException("Seat layout already exists for this coach type and seat number");
        }

        CoachType coachType = coachTypeRepo.findById(dto.getCoachTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("Coach type not found"));

        seatLayout.setCoachType(coachType);
        seatLayout.setSeatNumber(dto.getSeatNumber());
        seatLayout.setSeatType(dto.getSeatType());

        return new ApiResponseDTO<>("Seat layout updated successfully", "SUCCESS", null);
    }

    @Override
    public ApiResponseDTO<?> deleteSeatLayout(Long seatLayoutId) {

        SeatLayout seatLayout = getValidSeatLayout(seatLayoutId);
        seatLayoutRepo.delete(seatLayout);

        return new ApiResponseDTO<>("Seat layout deleted successfully", "SUCCESS", null);
    }
}