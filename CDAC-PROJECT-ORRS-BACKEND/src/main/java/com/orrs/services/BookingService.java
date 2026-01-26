package com.orrs.services;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.BookingReqDTO;
import com.orrs.dto.request.SeatReservationReqDTO;
import com.orrs.dto.response.BookingRespDTO;
import com.orrs.dto.response.SeatReservationRespDTO;

public interface BookingService {

    ApiResponseDTO<SeatReservationRespDTO> reserveSeats(SeatReservationReqDTO reqDTO, Long userId);

    ApiResponseDTO<BookingRespDTO> confirmBooking(BookingReqDTO reqDTO, Long userId);

    ApiResponseDTO<String> checkReservationStatus(Long reservationId, Long userId);
}