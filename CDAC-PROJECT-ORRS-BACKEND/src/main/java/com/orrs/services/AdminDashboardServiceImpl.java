package com.orrs.services;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.response.AdminDashboardStatsRespDTO;
import com.orrs.enums.TrainStatus;
import com.orrs.repositories.BookingRespository;
import com.orrs.repositories.StationRepository;
import com.orrs.repositories.TrainRepository;
import com.orrs.repositories.TrainScheduleRepository;
import com.orrs.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final TrainRepository trainRepository;
    private final StationRepository stationRepository;
    private final TrainScheduleRepository trainScheduleRepository;
    private final BookingRespository bookingRepository;
    private final UserRepository userRepository;

    @Override
    public ApiResponseDTO<AdminDashboardStatsRespDTO> getDashboardStats() {
        
        // Get total trains count (all trains)
        Long totalTrains = trainRepository.count();
        
        // Get total active trains count
        Long totalActiveTrains = trainRepository.countByTrainStatus(TrainStatus.ACTIVE);
        
        // Get total stations count (all stations)
        Long totalStations = stationRepository.countTotalStations();
        
        // Get total active stations count
        Long totalActiveStations = stationRepository.countActiveStations();
        
        // Get total scheduled trains from current date
        LocalDate currentDate = LocalDate.now();
        Long totalScheduledTrains = trainScheduleRepository.countScheduledTrainsFromDate(currentDate);
        
        // Get total bookings today
        Long totalBookingsToday = bookingRepository.countBookingsByDate(currentDate);
        
        // Get total registered users
        Long totalUsersRegistered = userRepository.countActiveUsers();

        AdminDashboardStatsRespDTO stats = new AdminDashboardStatsRespDTO(
                totalTrains,
                totalActiveTrains,
                totalStations,
                totalActiveStations,
                totalScheduledTrains,
                totalBookingsToday,
                totalUsersRegistered
        );

        return new ApiResponseDTO<>("Dashboard statistics retrieved successfully", "SUCCESS", stats);
    }
}