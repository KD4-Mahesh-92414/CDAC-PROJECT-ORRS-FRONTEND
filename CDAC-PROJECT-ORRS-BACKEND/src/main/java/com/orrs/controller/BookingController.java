package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.BookingReqDTO;
import com.orrs.dto.request.SeatReservationReqDTO;
import com.orrs.dto.response.BookingRespDTO;
import com.orrs.dto.response.SeatReservationRespDTO;
import com.orrs.security.UserPrincipal;
import com.orrs.services.BookingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/reserve-seats")
    public ResponseEntity<ApiResponseDTO<SeatReservationRespDTO>> reserveSeats(
            @Valid @RequestBody SeatReservationReqDTO reqDTO,
            @AuthenticationPrincipal UserPrincipal principal) {
        
        ApiResponseDTO<SeatReservationRespDTO> response = bookingService.reserveSeats(reqDTO, principal.getUserId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/confirm")
    public ResponseEntity<ApiResponseDTO<BookingRespDTO>> confirmBooking(
            @Valid @RequestBody BookingReqDTO reqDTO,
            @AuthenticationPrincipal UserPrincipal principal) {
        
        ApiResponseDTO<BookingRespDTO> response = bookingService.confirmBooking(reqDTO, principal.getUserId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/reservation/{reservationId}/status")
    public ResponseEntity<ApiResponseDTO<String>> checkReservationStatus(
            @PathVariable Long reservationId,
            @AuthenticationPrincipal UserPrincipal principal) {
        
        ApiResponseDTO<String> response = bookingService.checkReservationStatus(reservationId, principal.getUserId());
        
        return ResponseEntity.ok(response);
    }
}