package com.orrs.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orrs.custom_exceptions.ResourceNotFoundException;
import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.PNRStatusReqDTO;
import com.orrs.dto.response.PNRStatusRespDTO;
import com.orrs.entities.Booking;
import com.orrs.entities.TrainRoute;
import com.orrs.repositories.BookingRespository;
import com.orrs.repositories.TrainRouteRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PNRStatusServiceImpl implements PNRStatusService {

    private final BookingRespository bookingRepository;
    private final TrainRouteRepository trainRouteRepository;

    @Override
    public ApiResponseDTO<PNRStatusRespDTO> checkPNRStatus(PNRStatusReqDTO reqDTO) {
        
        // Find booking by PNR number
        Booking booking = bookingRepository.findByPnrNumberWithDetails(reqDTO.getPnrNumber())
                .orElseThrow(() -> new ResourceNotFoundException("PNR not found. Please check the PNR number."));

        // Get train route information for timing details
        List<TrainRoute> routes = trainRouteRepository.findByTrainIdOrderBySequenceNo(booking.getSchedule().getTrain().getId());
        
        TrainRoute sourceRoute = routes.stream()
                .filter(route -> route.getStation().getId().equals(booking.getSourceStation().getId()))
                .findFirst()
                .orElse(null);
                
        TrainRoute destRoute = routes.stream()
                .filter(route -> route.getStation().getId().equals(booking.getDestinationStation().getId()))
                .findFirst()
                .orElse(null);

        // Build train information
        PNRStatusRespDTO.TrainInfoDTO trainInfo = new PNRStatusRespDTO.TrainInfoDTO(
                booking.getSchedule().getTrain().getTrainNumber(),
                booking.getSchedule().getTrain().getTrainName(),
                booking.getCoachType().getTypeName()
        );

        // Build route information
        String departureTime = sourceRoute != null ? sourceRoute.getDepartureTime().toString() : "N/A";
        String arrivalTime = destRoute != null ? destRoute.getArrivalTime().toString() : "N/A";
        String distance = (sourceRoute != null && destRoute != null) 
                ? String.valueOf(destRoute.getDistanceFromSource() - sourceRoute.getDistanceFromSource()) + " km"
                : "N/A";

        PNRStatusRespDTO.RouteInfoDTO routeInfo = new PNRStatusRespDTO.RouteInfoDTO(
                booking.getSourceStation().getStationName(),
                booking.getDestinationStation().getStationName(),
                departureTime,
                arrivalTime,
                distance
        );

        // Build passenger information
        List<PNRStatusRespDTO.PassengerInfoDTO> passengers = booking.getTickets().stream()
                .map(ticket -> new PNRStatusRespDTO.PassengerInfoDTO(
                        ticket.getPassengerName(),
                        ticket.getAge(),
                        ticket.getGender().toString(),
                        ticket.getCoachLabel() + "-" + ticket.getSeatNumber(),
                        "CONFIRMED" // Since we don't have waitlist, all confirmed bookings show as CONFIRMED
                ))
                .collect(Collectors.toList());

        // Build response
        PNRStatusRespDTO response = new PNRStatusRespDTO(
                booking.getPnrNumber(),
                booking.getStatus(),
                booking.getJourneyDate(),
                booking.getBookingDate(),
                booking.getTotalFare(),
                trainInfo,
                routeInfo,
                passengers
        );

        return new ApiResponseDTO<>("PNR status retrieved successfully", "SUCCESS", response);
    }
}