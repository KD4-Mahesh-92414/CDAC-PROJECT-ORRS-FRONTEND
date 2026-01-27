package com.orrs.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.response.TrainStatusRespDTO;
import com.orrs.repositories.TrainScheduleRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TrainStatusServiceImpl implements TrainStatusService {

    private final TrainScheduleRepository trainScheduleRepository;

    @Override
    public ApiResponseDTO<List<TrainStatusRespDTO>> getCancelledAndRescheduledTrains() {
        
        // Get cancelled and rescheduled trains from current date onwards
        LocalDate currentDate = LocalDate.now();
        List<TrainStatusRespDTO> trainStatusList = trainScheduleRepository.findCancelledAndRescheduledTrains(currentDate);

        return new ApiResponseDTO<>("Cancelled and rescheduled trains retrieved successfully", "SUCCESS", trainStatusList);
    }
}