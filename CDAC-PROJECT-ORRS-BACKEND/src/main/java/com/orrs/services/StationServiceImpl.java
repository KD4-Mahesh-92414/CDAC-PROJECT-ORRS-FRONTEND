package com.orrs.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.orrs.custom_exceptions.ResourceAlreadyExistsException;
import com.orrs.custom_exceptions.ResourceNotFoundException;
import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.AddStationReqDTO;
import com.orrs.dto.request.UpdateStationReqDTO;
import com.orrs.dto.response.StationAdminViewDTO;
import com.orrs.entities.Station;
import com.orrs.enums.StationStatus;
import com.orrs.repositories.StationRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class StationServiceImpl implements StationService {

    private final StationRepository stationRepo;
    private final ModelMapper modelMapper;

    // centralized valid station check
    private Station getValidStation(Long stationId) {
        return stationRepo.findById(stationId)
                .filter(s -> s.getStatus() == StationStatus.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException("Station does not exist"));
    }

    @Override
    public ApiResponseDTO<?> addStation(AddStationReqDTO dto) {

        if (stationRepo.existsByStationCode(dto.getStationCode())) {
            throw new ResourceAlreadyExistsException("Station with this code already exists");
        }

        Station station = modelMapper.map(dto, Station.class);
        station.setStatus(StationStatus.ACTIVE);

        stationRepo.save(station);

        return new ApiResponseDTO<>("Station added successfully", "SUCCESS", null);
    }

    @Override
    public ApiResponseDTO<?> getAllStations() {

        List<StationAdminViewDTO> stations = stationRepo.fetchAllStations();
        return new ApiResponseDTO<>("All stations fetched successfully", "SUCCESS", stations);
    }

    @Override
    public ApiResponseDTO<?> updateStation(Long stationId, UpdateStationReqDTO dto) {

        Station station = getValidStation(stationId);

        if (!dto.getStationCode().equals(station.getStationCode())
                && stationRepo.existsByStationCode(dto.getStationCode())) {
            throw new ResourceAlreadyExistsException("Station with this code already exists");
        }

        modelMapper.map(dto, station);

        return new ApiResponseDTO<>("Station updated successfully", "SUCCESS", null);
    }

    @Override
    public ApiResponseDTO<?> deleteStation(Long stationId) {

        Station station = getValidStation(stationId);
        station.setStatus(StationStatus.INACTIVE);

        return new ApiResponseDTO<>("Station deleted successfully", "SUCCESS", null);
    }
}
