package com.orrs.services;

import java.util.List;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.CancelBookingReqDTO;
import com.orrs.dto.request.SavedPassengerReqDTO;
import com.orrs.dto.response.BookingDetailRespDTO;
import com.orrs.dto.response.BookingHistoryRespDTO;
import com.orrs.dto.response.BookingStatsRespDTO;
import com.orrs.dto.response.PaymentHistoryRespDTO;
import com.orrs.dto.response.PaymentSummaryRespDTO;
import com.orrs.dto.response.SavedPassengerRespDTO;

public interface UserBookingService {

    // Payment related methods
    ApiResponseDTO<List<PaymentHistoryRespDTO>> getPaymentHistory(Long userId);
    
    ApiResponseDTO<PaymentSummaryRespDTO> getPaymentSummary(Long userId);

    // Booking related methods
    ApiResponseDTO<List<BookingHistoryRespDTO>> getBookingHistory(Long userId);
    
    ApiResponseDTO<BookingDetailRespDTO> getBookingDetails(Long bookingId, Long userId);
    
    ApiResponseDTO<String> cancelBooking(CancelBookingReqDTO reqDTO, Long userId);
    
    ApiResponseDTO<BookingStatsRespDTO> getBookingStats(Long userId);

    // Saved passengers CRUD
    ApiResponseDTO<List<SavedPassengerRespDTO>> getSavedPassengers(Long userId);
    
    ApiResponseDTO<SavedPassengerRespDTO> addSavedPassenger(SavedPassengerReqDTO reqDTO, Long userId);
    
    ApiResponseDTO<SavedPassengerRespDTO> updateSavedPassenger(Long passengerId, SavedPassengerReqDTO reqDTO, Long userId);
    
    ApiResponseDTO<String> deleteSavedPassenger(Long passengerId, Long userId);
}