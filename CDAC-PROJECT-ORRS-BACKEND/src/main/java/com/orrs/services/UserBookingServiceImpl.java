package com.orrs.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orrs.custom_exceptions.BusinessLogicException;
import com.orrs.custom_exceptions.ResourceNotFoundException;
import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.CancelBookingReqDTO;
import com.orrs.dto.request.SavedPassengerReqDTO;
import com.orrs.dto.response.BookingDetailRespDTO;
import com.orrs.dto.response.BookingHistoryRespDTO;
import com.orrs.dto.response.BookingStatsRespDTO;
import com.orrs.dto.response.PaymentHistoryRespDTO;
import com.orrs.dto.response.PaymentSummaryRespDTO;
import com.orrs.dto.response.SavedPassengerRespDTO;
import com.orrs.entities.Booking;
import com.orrs.entities.Payment;
import com.orrs.entities.SavedPassenger;
import com.orrs.entities.User;
import com.orrs.enums.AccountStatus;
import com.orrs.enums.BookingStatus;
import com.orrs.enums.PaymentStatus;
import com.orrs.repositories.BookingRespository;
import com.orrs.repositories.PaymentRepository;
import com.orrs.repositories.SavedPassengerRepository;
import com.orrs.repositories.TrainRouteRepository;
import com.orrs.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserBookingServiceImpl implements UserBookingService {

    private final UserRepository userRepository;
    private final BookingRespository bookingRepository;
    private final PaymentRepository paymentRepository;
    private final SavedPassengerRepository savedPassengerRepository;
    private final TrainRouteRepository trainRouteRepository;
    private final ModelMapper modelMapper;

    // Centralized valid user checking (following existing pattern)
    private User getValidUser(Long userId) {
        User user = userRepository.findById(userId)
                .filter(u -> u.getStatus() != AccountStatus.DELETED)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist"));
        if (user.getStatus() == AccountStatus.SUSPENDED) {
            throw new BusinessLogicException("Your account has been suspended. Please contact support.");
        }
        return user;
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponseDTO<List<PaymentHistoryRespDTO>> getPaymentHistory(Long userId) {
        getValidUser(userId); // Validate user exists and is active
        
        List<PaymentHistoryRespDTO> paymentHistory = paymentRepository.findPaymentHistoryByUserId(userId);
        
        return new ApiResponseDTO<>("Payment history fetched successfully", "SUCCESS", paymentHistory);
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponseDTO<PaymentSummaryRespDTO> getPaymentSummary(Long userId) {
        getValidUser(userId); // Validate user exists and is active
        
        BigDecimal totalSpent = paymentRepository.getTotalAmountByUserIdAndStatus(userId, PaymentStatus.SUCCESS);
        Long totalPayments = paymentRepository.getPaymentCountByUserIdAndStatus(userId, PaymentStatus.SUCCESS);
        BigDecimal totalRefunded = paymentRepository.getTotalRefundedAmountByUserId(userId);
        
        PaymentSummaryRespDTO summary = new PaymentSummaryRespDTO(totalSpent, totalPayments, totalRefunded);
        
        return new ApiResponseDTO<>("Payment summary fetched successfully", "SUCCESS", summary);
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponseDTO<List<BookingHistoryRespDTO>> getBookingHistory(Long userId) {
        getValidUser(userId); // Validate user exists and is active
        
        List<BookingHistoryRespDTO> bookingHistory = bookingRepository.findBookingHistoryByUserId(userId);
        
        return new ApiResponseDTO<>("Booking history fetched successfully", "SUCCESS", bookingHistory);
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponseDTO<BookingDetailRespDTO> getBookingDetails(Long bookingId, Long userId) {
        getValidUser(userId); // Validate user exists and is active
        
        Booking booking = bookingRepository.findBookingDetailsByIdAndUserId(bookingId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        // Build detailed response
        BookingDetailRespDTO response = new BookingDetailRespDTO();
        response.setBookingId(booking.getId());
        response.setPnrNumber(booking.getPnrNumber());
        response.setStatus(booking.getStatus());
        response.setBookingType(booking.getBookingType());
        response.setBookingDate(booking.getBookingDate());
        response.setJourneyDate(booking.getJourneyDate());
        response.setTotalFare(booking.getTotalFare());

        // Train Details
        BookingDetailRespDTO.TrainDetailsDTO trainDetails = new BookingDetailRespDTO.TrainDetailsDTO(
                booking.getSchedule().getTrain().getTrainNumber(),
                booking.getSchedule().getTrain().getTrainName(),
                booking.getCoachType().getTypeName()
        );
        response.setTrainDetails(trainDetails);

        // Route Details - Get timing from TrainRoute
        Long trainId = booking.getSchedule().getTrain().getId();
        Long sourceStationId = booking.getSourceStation().getId();
        Long destinationStationId = booking.getDestinationStation().getId();
        
        String departureTime = trainRouteRepository.findDepartureTimeByTrainAndStation(trainId, sourceStationId)
                .map(time -> time.toString())
                .orElse("N/A");
        
        String arrivalTime = trainRouteRepository.findArrivalTimeByTrainAndStation(trainId, destinationStationId)
                .map(time -> time.toString())
                .orElse("N/A");
        
        BookingDetailRespDTO.RouteDetailsDTO routeDetails = new BookingDetailRespDTO.RouteDetailsDTO(
                booking.getSourceStation().getStationName(),
                booking.getDestinationStation().getStationName(),
                departureTime,
                arrivalTime
        );
        response.setRouteDetails(routeDetails);

        // Passenger Details
        List<BookingDetailRespDTO.PassengerDetailsDTO> passengers = booking.getTickets().stream()
                .map(ticket -> new BookingDetailRespDTO.PassengerDetailsDTO(
                        ticket.getPassengerName(),
                        ticket.getAge(),
                        ticket.getGender().toString(),
                        ticket.getCoachLabel() + "-" + ticket.getSeatNumber(),
                        ticket.getTicketFare()
                ))
                .collect(Collectors.toList());
        response.setPassengers(passengers);

        // Payment Details
        BookingDetailRespDTO.PaymentDetailsDTO paymentDetails = null;
        if (!booking.getPayments().isEmpty()) {
            Payment payment = booking.getPayments().get(0); // Get the first payment
            paymentDetails = new BookingDetailRespDTO.PaymentDetailsDTO(
                    payment.getTransactionId(),
                    payment.getPaymentMethod().toString(),
                    payment.getStatus().toString(),
                    payment.getPaymentDate(),
                    payment.getRefundAmount()
            );
        }
        response.setPaymentDetails(paymentDetails);

        return new ApiResponseDTO<>("Booking details fetched successfully", "SUCCESS", response);
    }

    @Override
    public ApiResponseDTO<String> cancelBooking(CancelBookingReqDTO reqDTO, Long userId) {
        getValidUser(userId); // Validate user exists and is active
        
        Booking booking = bookingRepository.findByIdAndUserId(reqDTO.getBookingId(), userId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        // Validate booking can be cancelled
        if (booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new BusinessLogicException("Only confirmed bookings can be cancelled");
        }

        // Check if train has not yet departed
        LocalDateTime currentDateTime = LocalDateTime.now();
        
        // Get departure time from TrainRoute
        Long trainId = booking.getSchedule().getTrain().getId();
        Long sourceStationId = booking.getSourceStation().getId();
        
        LocalTime departureTime = trainRouteRepository.findDepartureTimeByTrainAndStation(trainId, sourceStationId)
                .orElse(LocalTime.of(23, 59)); // Default to end of day if not found
        
        LocalDateTime journeyDateTime = LocalDateTime.of(booking.getJourneyDate(), departureTime);
        
        if (currentDateTime.isAfter(journeyDateTime)) {
            throw new BusinessLogicException("Cannot cancel booking after train departure");
        }

        // Update booking status
        booking.setStatus(BookingStatus.CANCELLED);
        
        // Here you would typically:
        // 1. Process refund
        // 2. Update payment status
        // 3. Send notification
        // For now, we'll just update the booking status
        
        return new ApiResponseDTO<>("Booking cancelled successfully", "SUCCESS", 
                "Your booking " + booking.getPnrNumber() + " has been cancelled. Refund will be processed within 5-7 business days.");
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponseDTO<BookingStatsRespDTO> getBookingStats(Long userId) {
        getValidUser(userId); // Validate user exists and is active
        
        Long totalBookings = bookingRepository.countTotalBookingsByUserId(userId);
        Long confirmedBookings = bookingRepository.countBookingsByUserIdAndStatus(userId, BookingStatus.CONFIRMED);
        Long completedBookings = bookingRepository.countCompletedBookingsByUserId(userId, LocalDate.now());
        Long cancelledBookings = bookingRepository.countBookingsByUserIdAndStatus(userId, BookingStatus.CANCELLED);
        
        BookingStatsRespDTO stats = new BookingStatsRespDTO(totalBookings, confirmedBookings, completedBookings, cancelledBookings);
        
        return new ApiResponseDTO<>("Booking statistics fetched successfully", "SUCCESS", stats);
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponseDTO<List<SavedPassengerRespDTO>> getSavedPassengers(Long userId) {
        getValidUser(userId); // Validate user exists and is active
        
        List<SavedPassenger> savedPassengers = savedPassengerRepository.findByUserIdOrderByNameAsc(userId);
        
        List<SavedPassengerRespDTO> response = savedPassengers.stream()
                .map(passenger -> modelMapper.map(passenger, SavedPassengerRespDTO.class))
                .collect(Collectors.toList());
        
        return new ApiResponseDTO<>("Saved passengers fetched successfully", "SUCCESS", response);
    }

    @Override
    public ApiResponseDTO<SavedPassengerRespDTO> addSavedPassenger(SavedPassengerReqDTO reqDTO, Long userId) {
        User user = getValidUser(userId); // Validate user exists and is active
        
        // Check if user has reached maximum saved passengers limit (optional business rule)
        Long currentCount = savedPassengerRepository.countByUserId(userId);
        if (currentCount >= 6) { // Assuming max 6 saved passengers
            throw new BusinessLogicException("Maximum limit of 6 saved passengers reached");
        }
        
        SavedPassenger savedPassenger = modelMapper.map(reqDTO, SavedPassenger.class);
        savedPassenger.setUser(user);
        
        SavedPassenger savedEntity = savedPassengerRepository.save(savedPassenger);
        SavedPassengerRespDTO response = modelMapper.map(savedEntity, SavedPassengerRespDTO.class);
        
        return new ApiResponseDTO<>("Passenger saved successfully", "SUCCESS", response);
    }

    @Override
    public ApiResponseDTO<SavedPassengerRespDTO> updateSavedPassenger(Long passengerId, SavedPassengerReqDTO reqDTO, Long userId) {
        getValidUser(userId); // Validate user exists and is active
        
        SavedPassenger savedPassenger = savedPassengerRepository.findByIdAndUserId(passengerId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Saved passenger not found"));
        
        // Update passenger details
        modelMapper.map(reqDTO, savedPassenger);
        
        SavedPassenger updatedEntity = savedPassengerRepository.save(savedPassenger);
        SavedPassengerRespDTO response = modelMapper.map(updatedEntity, SavedPassengerRespDTO.class);
        
        return new ApiResponseDTO<>("Passenger details updated successfully", "SUCCESS", response);
    }

    @Override
    public ApiResponseDTO<String> deleteSavedPassenger(Long passengerId, Long userId) {
        getValidUser(userId); // Validate user exists and is active
        
        SavedPassenger savedPassenger = savedPassengerRepository.findByIdAndUserId(passengerId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Saved passenger not found"));
        
        savedPassengerRepository.delete(savedPassenger);
        
        return new ApiResponseDTO<>("Passenger deleted successfully", "SUCCESS", null);
    }
}