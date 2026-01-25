package com.orrs.services;



import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.TrainSearchReqDTO;
import com.orrs.dto.response.SearchResultRespDTO;
import com.orrs.dto.response.TrainCoachRespDTO;
import com.orrs.entities.CoachType;
import com.orrs.entities.Station;
import com.orrs.entities.TrainFare;
import com.orrs.enums.BookingStatus;
import com.orrs.enums.ScheduleStatus;
import com.orrs.repositories.BookingRespository;
import com.orrs.repositories.StationRespository;
import com.orrs.repositories.TrainCoachRepository;
import com.orrs.repositories.TrainFareRepository;
import com.orrs.repositories.TrainScheduleRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TrainScheduleServiceImpl implements TrainScheduleService{
	
	private final TrainScheduleRepository scheduleRepository;
	private final StationRespository stationRepository;
	private final TrainFareRepository fareRepository;     
    private final TrainCoachRepository coachRepository;    
    private final BookingRespository bookingRepository;     
	private static final int MAX_ADVANCE_DAYS = 90;

    public List<SearchResultRespDTO> searchTrains(Long sourceId, Long destId, LocalDate date) {
        // 1. Basic Validation
        if (sourceId.equals(destId)) {
            throw new IllegalArgumentException("Source and Destination cannot be same");
        }
        
        // 2. Execute the optimized query
        return scheduleRepository.findAvailableTrains(sourceId, destId, date, ScheduleStatus.RUNNING);
    }

	@Override
	public ApiResponseDTO<?> searchTrains(TrainSearchReqDTO searchDto) {
        
        LocalDate today = LocalDate.now();

        // 1. Check for Past Dates
        if (searchDto.getJourneyDate().isBefore(today)) {
            throw new IllegalArgumentException("Journey date cannot be in the past.");
        }

        // 2. Check for Advance Reservation Period (ARP)
        if (searchDto.getJourneyDate().isAfter(today.plusDays(MAX_ADVANCE_DAYS))) {
            throw new IllegalArgumentException("Bookings are only allowed up to " + MAX_ADVANCE_DAYS + " days in advance.");
        }
        

        // Resolve Stations
        Station sourceStation = stationRepository.findByStationNameIgnoreCase(searchDto.getSourceStation())
                .orElseThrow(() -> new RuntimeException("Source station not found: " + searchDto.getSourceStation()));

        Station destStation = stationRepository.findByStationNameIgnoreCase(searchDto.getDestinationStation())
                .orElseThrow(() -> new RuntimeException("Destination station not found: " + searchDto.getDestinationStation()));

        if (sourceStation.getId().equals(destStation.getId())) {
            throw new IllegalArgumentException("Source and Destination cannot be the same.");
        }

        // Execute Search
        List<SearchResultRespDTO> trains = scheduleRepository.findAvailableTrains(
            sourceStation.getId(), 
            destStation.getId(), 
            searchDto.getJourneyDate(),
            ScheduleStatus.RUNNING
            
        );
        
     // 3. ENRICHMENT LOOP: Calculate Fares & Availability for each train
        // 
        for (SearchResultRespDTO train : trains) {
            
            // A. Fetch all configured fares (SL, 3A, 2A...)
            List<TrainFare> fares = fareRepository.findByTrainId(train.getTrainId());
            List<TrainCoachRespDTO> coachOptions = new ArrayList<>();

            for (TrainFare fare : fares) {
                CoachType coachType = fare.getCoachType();

                // B. Calculate Dynamic Fare based on Distance
                BigDecimal totalFare = fare.calculateFare(train.getDistanceKm());

                // C. Calculate Availability 
                Integer availability = calculateAvailability(
                    train.getTrainId(),
                    train.getScheduleId(), 
                    coachType
                );

                // D. Determine Status
                String status = (availability > 0) ? "AVAILABLE" : "WL " + Math.abs(availability);

                // E. Add to list
                coachOptions.add(new TrainCoachRespDTO(
                    coachType.getId(),
                    coachType.getTypeCode(),       
                    coachType.getTypeName(),       
                    coachType.getCoachImageUrl(),  
                    totalFare,
                    availability,
                    status
                ));
            }
            // Attach enriched list to the train DTO
            train.setClassOptions(coachOptions);
        }

        // 4. Filter departed trains if searching for today
        if (searchDto.getJourneyDate().equals(today)) {
             trains = filterDepartedTrains(trains);
        }

        return new ApiResponseDTO<List<SearchResultRespDTO>>("Trains fetched successfully", "SUCCESS", trains);
  
	}
	
	// Helper to calculate Available Seats
    private Integer calculateAvailability(Long trainId, Long scheduleId, CoachType coachType) {
        Integer totalCapacity = coachRepository.countTotalSeats(trainId, coachType.getId());
        if (totalCapacity == null) totalCapacity = 0;

        Integer bookedCount = bookingRepository.countBookedSeats(scheduleId, coachType.getId(), BookingStatus.CONFIRMED);
        if (bookedCount == null) bookedCount = 0;

        return totalCapacity - bookedCount;
        
    }
//     Helper to remove trains that have already left the source station
//     (Only runs if the User searches for TODAY)
     
    private List<SearchResultRespDTO> filterDepartedTrains(List<SearchResultRespDTO> trains) {
        LocalTime now = LocalTime.now();
        return trains.stream()
                .filter(t -> t.getDepartureTime().isAfter(now))
                .toList();
    }

}
