package com.orrs.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.orrs.custom_exceptions.InvalidRequestException;
import com.orrs.custom_exceptions.ResourceAlreadyExistsException;
import com.orrs.custom_exceptions.ResourceNotFoundException;
import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AddTrainReqDTO;
import com.orrs.dto.request.UpdateTrainReqDTO;
import com.orrs.dto.request.UpdateTrainStatusReqDTO;
import com.orrs.dto.response.TrainAdminViewDTO;
import com.orrs.entities.Station;
import com.orrs.entities.Train;
import com.orrs.enums.TrainStatus;
import com.orrs.repositories.StationRepository;
import com.orrs.repositories.TrainRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TrainServiceImpl implements TrainService {

    private final TrainRepository trainRepo;
    private final StationRepository stationRepo;
    private final ModelMapper modelMapper;

    // centralized valid train check
    private Train getValidTrain(Long trainId) {
        return trainRepo.findById(trainId)
                .filter(t -> t.getTrainStatus() == TrainStatus.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException("Train does not exist"));
    }

    @Override
    public ApiResponseDTO<?> addTrain(AddTrainReqDTO dto) {

        if (trainRepo.existsByTrainNumber(dto.getTrainNumber())) {
            throw new ResourceAlreadyExistsException("Train with this number already exists");
        }

        if (dto.getSourceStationId().equals(dto.getDestinationStationId())) {
            throw new InvalidRequestException("Source and destination stations cannot be same");
        }

        Station source = stationRepo.findById(dto.getSourceStationId())
                .orElseThrow(() -> new ResourceNotFoundException("Source station not found"));

        Station destination = stationRepo.findById(dto.getDestinationStationId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination station not found"));

        Train train = modelMapper.map(dto, Train.class);
        train.setSourceStation(source);
        train.setDestinationStation(destination);

        trainRepo.save(train);

        return new ApiResponseDTO<>("Train added successfully", "SUCCESS", null);
    }

    @Override
    public ApiResponseDTO<?> getAllTrains() {
        List<TrainAdminViewDTO> trains = trainRepo.fetchAllTrains();
        return new ApiResponseDTO<>("All trains fetched successfully", "SUCCESS", trains);
    }

    @Override
    public ApiResponseDTO<?> updateTrain(Long trainId, UpdateTrainReqDTO dto) {

        Train train = getValidTrain(trainId);

        if (!dto.getTrainNumber().equals(train.getTrainNumber())
                && trainRepo.existsByTrainNumber(dto.getTrainNumber())) {
            throw new ResourceAlreadyExistsException("Train with this number already exists");
        }

        if (dto.getSourceStationId().equals(dto.getDestinationStationId())) {
            throw new InvalidRequestException("Source and destination stations cannot be same");
        }

        Station source = stationRepo.findById(dto.getSourceStationId())
                .orElseThrow(() -> new ResourceNotFoundException("Source station not found"));

        Station destination = stationRepo.findById(dto.getDestinationStationId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination station not found"));

        modelMapper.map(dto, train);
        train.setSourceStation(source);
        train.setDestinationStation(destination);

        return new ApiResponseDTO<>("Train updated successfully", "SUCCESS", null);
    }
    
    @Override
    public ApiResponseDTO<?> updateTrainStatus(
            Long trainId,
            UpdateTrainStatusReqDTO dto
    ) {

        Train train = trainRepo.findById(trainId)
                .orElseThrow(() -> new ResourceNotFoundException("Train does not exist"));

        TrainStatus newStatus = dto.getStatus();

        // optional: prevent redundant update
        if (train.getTrainStatus() == newStatus) {
            throw new InvalidRequestException("Train is already in the given status");
        }

        train.setTrainStatus(newStatus);

        return new ApiResponseDTO<>("Train status updated successfully", "SUCCESS", null);
    }


    @Override
    public ApiResponseDTO<?> deleteTrain(Long trainId) {

        Train train = getValidTrain(trainId);
        train.setTrainStatus(TrainStatus.INACTIVE);

        return new ApiResponseDTO<>("Train deleted successfully", "SUCCESS", null);
    }
}
