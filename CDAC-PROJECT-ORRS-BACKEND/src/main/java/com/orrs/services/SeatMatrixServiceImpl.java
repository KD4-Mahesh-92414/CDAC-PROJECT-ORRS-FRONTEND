package com.orrs.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.SeatMatrixReqDTO;
import com.orrs.dto.response.SeatRespDTO;
import com.orrs.dto.response.SeatMatrixRespDTO;
import com.orrs.entities.SeatLayout;
import com.orrs.entities.TrainCoach;
import com.orrs.enums.BookingStatus;
import com.orrs.repositories.SeatLayoutRepository;
import com.orrs.repositories.SeatReservationRepository;
import com.orrs.repositories.TicketRepository;
import com.orrs.custom_exceptions.ServiceException;
import com.orrs.repositories.TrainCoachRepository;
import com.orrs.repositories.TrainScheduleRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SeatMatrixServiceImpl implements SeatMatrixService {

    private final TrainScheduleRepository scheduleRepository;
    private final TrainCoachRepository trainCoachRepository;
    private final SeatLayoutRepository seatLayoutRepository;
    private final SeatReservationRepository seatReservationRepository;
    private final TicketRepository ticketRepository;

    @Override
    @Transactional(readOnly = true)
    public ApiResponseDTO<List<SeatMatrixRespDTO>> getSeatMatrix(SeatMatrixReqDTO reqDTO, Long userId) {
        
        LocalDateTime currentTime = LocalDateTime.now();
        
        // 1. Get the Train ID from the Schedule
        Long trainId = scheduleRepository.findById(reqDTO.getScheduleId())
                .orElseThrow(() -> new ServiceException("Schedule not found"))
                .getTrain().getId();

        // 2. Fetch the Physical Coaches (e.g., S1, S2, S3)
        List<TrainCoach> physicalCoaches = trainCoachRepository.findByTrainIdAndCoachTypeId(
                trainId, reqDTO.getCoachTypeId());
        
        if (physicalCoaches.isEmpty()) {
            throw new ServiceException("No coaches found for this type in the selected train.");
        }

        // 3. Fetch the Layout Template (Seats 1 to 72 with Types)
        List<SeatLayout> layoutTemplate = seatLayoutRepository.findByCoachType_IdOrderBySeatNumberAsc(reqDTO.getCoachTypeId());

        // 4. Fetch Confirmed Booked Seats for the journey segment
        List<Object[]> bookedData = ticketRepository.findBookedSeatsForJourneySegment(
                reqDTO.getScheduleId(), 
                reqDTO.getCoachTypeId(),
                reqDTO.getSourceStationId(),
                reqDTO.getDestinationStationId(),
                BookingStatus.CONFIRMED
        );
        
        // 5. Fetch Active Reservations with user info and expiry
        List<Object[]> reservationData = seatReservationRepository.findActiveReservationsForMatrix(
                reqDTO.getScheduleId(),
                reqDTO.getCoachTypeId(),
                currentTime
        );
        
        // 6. Process the data into sets and maps
        Set<String> confirmedBookedSeats = new HashSet<>();
        for (Object[] row : bookedData) {
            String label = (String) row[0];
            Integer seatNo = (Integer) row[1];
            confirmedBookedSeats.add(label + "-" + seatNo);
        }
        
        Map<String, ReservationInfo> activeReservations = new HashMap<>();
        List<Long> expiredReservationIds = new ArrayList<>();
        
        for (Object[] row : reservationData) {
            String label = (String) row[0];
            Integer seatNo = (Integer) row[1];
            Long reservationUserId = (Long) row[2];
            LocalDateTime expiresAt = (LocalDateTime) row[3];
            Long reservationId = (Long) row[4];
            
            String seatKey = label + "-" + seatNo;
            
            if (expiresAt.isBefore(currentTime)) {
                // Lazy cleanup - mark for expiration
                expiredReservationIds.add(reservationId);
            } else {
                activeReservations.put(seatKey, new ReservationInfo(
                    reservationId, reservationUserId, expiresAt
                ));
            }
        }
        
        // 7. Perform lazy cleanup of expired reservations
        if (!expiredReservationIds.isEmpty()) {
            for (Long expiredId : expiredReservationIds) {
                seatReservationRepository.markAsExpired(expiredId);
            }
        }

        // 8. Build the Matrix Response
        List<SeatMatrixRespDTO> responseList = new ArrayList<>();

        for (TrainCoach coach : physicalCoaches) {
            String label = coach.getCoachLabel(); // e.g., "S1"
            
            List<SeatRespDTO> coachSeats = new ArrayList<>();

            // Iterate through the template (1 to 72) for this specific coach
            for (SeatLayout layout : layoutTemplate) {
                
                String seatKey = label + "-" + layout.getSeatNumber();
                String status;
                
                if (confirmedBookedSeats.contains(seatKey)) {
                    status = "LOCKED"; // Permanently booked
                } else if (activeReservations.containsKey(seatKey)) {
                    ReservationInfo reservation = activeReservations.get(seatKey);
                    if (reservation.getUserId().equals(userId)) {
                        status = "MY_RESERVATION"; // User's own reservation
                    } else {
                        status = "LOCKED"; // Reserved by another user
                    }
                } else {
                    status = "AVAILABLE"; // Can be selected
                }

                coachSeats.add(new SeatRespDTO(
                    layout.getSeatNumber(),
                    layout.getSeatType().toString(),
                    status
                ));
            }

            responseList.add(new SeatMatrixRespDTO(label, coachSeats));
        }

        return new ApiResponseDTO<>("Seat matrix fetched successfully", "SUCCESS", responseList);
    }
    
    // Helper class to hold reservation information
    private static class ReservationInfo {
        private final Long reservationId;
        private final Long userId;
        private final LocalDateTime expiresAt;
        
        public ReservationInfo(Long reservationId, Long userId, LocalDateTime expiresAt) {
            this.reservationId = reservationId;
            this.userId = userId;
            this.expiresAt = expiresAt;
        }
        
        public Long getReservationId() { return reservationId; }
        public Long getUserId() { return userId; }
        public LocalDateTime getExpiresAt() { return expiresAt; }
    }
}