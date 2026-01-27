package com.orrs.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.orrs.custom_exceptions.ResourceAlreadyExistsException;
import com.orrs.custom_exceptions.ResourceNotFoundException;
import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AddTrainRouteReqDTO;
import com.orrs.dto.request.UpdateTrainRouteReqDTO;
import com.orrs.dto.response.TrainRouteAdminViewDTO;
import com.orrs.entities.Station;
import com.orrs.entities.Train;
import com.orrs.entities.TrainRoute;
import com.orrs.repositories.StationRepository;
import com.orrs.repositories.TrainRepository;
import com.orrs.repositories.TrainRouteRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TrainRouteServiceImpl implements TrainRouteService {

    private final TrainRouteRepository trainRouteRepo;
    private final TrainRepository trainRepo;
    private final StationRepository stationRepo;
    private final ModelMapper modelMapper;

    // centralized valid train route check
    private TrainRoute getValidTrainRoute(Long trainRouteId) {
        return trainRouteRepo.findById(trainRouteId)
                .orElseThrow(() -> new ResourceNotFoundException("Train route does not exist"));
    }

    @Override
    public ApiResponseDTO<?> addTrainRoute(AddTrainRouteReqDTO dto) {

        if (trainRouteRepo.findByTrainIdAndSequenceNo(dto.getTrainId(), dto.getSequenceNo()).isPresent()) {
            throw new ResourceAlreadyExistsException("Train route already exists for this train and sequence number");
        }

        if (trainRouteRepo.findByTrainIdAndStationId(dto.getTrainId(), dto.getStationId()).isPresent()) {
            throw new ResourceAlreadyExistsException("Train route already exists for this train and station");
        }

        Train train = trainRepo.findById(dto.getTrainId())
                .orElseThrow(() -> new ResourceNotFoundException("Train not found"));

        Station station = stationRepo.findById(dto.getStationId())
                .orElseThrow(() -> new ResourceNotFoundException("Station not found"));

        TrainRoute trainRoute = modelMapper.map(dto, TrainRoute.class);
        trainRoute.setTrain(train);
        trainRoute.setStation(station);

        trainRouteRepo.save(trainRoute);

        return new ApiResponseDTO<>("Train route added successfully", "SUCCESS", null);
    }

    @Override
    public ApiResponseDTO<?> getAllTrainRoutes() {

        List<TrainRouteAdminViewDTO> trainRoutes = trainRouteRepo.fetchAllTrainRoutes();
        return new ApiResponseDTO<>("All train routes fetched successfully", "SUCCESS", trainRoutes);
    }

    @Override
    public ApiResponseDTO<?> updateTrainRoute(Long trainRouteId, UpdateTrainRouteReqDTO dto) {

        TrainRoute trainRoute = getValidTrainRoute(trainRouteId);

        if ((!dto.getTrainId().equals(trainRoute.getTrain().getId()) || 
             !dto.getSequenceNo().equals(trainRoute.getSequenceNo())) &&
            trainRouteRepo.findByTrainIdAndSequenceNo(dto.getTrainId(), dto.getSequenceNo()).isPresent()) {
            throw new ResourceAlreadyExistsException("Train route already exists for this train and sequence number");
        }

        if ((!dto.getTrainId().equals(trainRoute.getTrain().getId()) || 
             !dto.getStationId().equals(trainRoute.getStation().getId())) &&
            trainRouteRepo.findByTrainIdAndStationId(dto.getTrainId(), dto.getStationId()).isPresent()) {
            throw new ResourceAlreadyExistsException("Train route already exists for this train and station");
        }

        Train train = trainRepo.findById(dto.getTrainId())
                .orElseThrow(() -> new ResourceNotFoundException("Train not found"));

        Station station = stationRepo.findById(dto.getStationId())
                .orElseThrow(() -> new ResourceNotFoundException("Station not found"));

        modelMapper.map(dto, trainRoute);
        trainRoute.setTrain(train);
        trainRoute.setStation(station);

        return new ApiResponseDTO<>("Train route updated successfully", "SUCCESS", null);
    }

    @Override
    public ApiResponseDTO<?> deleteTrainRoute(Long trainRouteId) {

        TrainRoute trainRoute = getValidTrainRoute(trainRouteId);
        trainRouteRepo.delete(trainRoute);

        return new ApiResponseDTO<>("Train route deleted successfully", "SUCCESS", null);
    }
}