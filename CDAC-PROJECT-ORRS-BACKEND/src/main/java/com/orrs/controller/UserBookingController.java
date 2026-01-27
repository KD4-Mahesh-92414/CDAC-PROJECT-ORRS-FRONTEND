package com.orrs.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orrs.dto.request.CancelBookingReqDTO;
import com.orrs.dto.request.SavedPassengerReqDTO;
import com.orrs.dto.response.BookingDetailRespDTO;
import com.orrs.dto.response.BookingHistoryRespDTO;
import com.orrs.dto.response.BookingStatsRespDTO;
import com.orrs.dto.response.PaymentHistoryRespDTO;
import com.orrs.dto.response.PaymentSummaryRespDTO;
import com.orrs.dto.response.SavedPassengerRespDTO;
import com.orrs.security.UserPrincipal;
import com.orrs.services.UserBookingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/users/bookings")
@CrossOrigin(origins = "*")
public class UserBookingController {

    private final UserBookingService userBookingService;

    // GET /users/bookings/payments/history
    // - Get payment history of the user
    // - Output: List of payments with PNR, Train, Date, Amount, Payment Method, Status
    // - Requires authentication
    @GetMapping("/payments/history")
    public ResponseEntity<?> getPaymentHistory(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userBookingService.getPaymentHistory(principal.getUserId()));
    }

    // GET /users/bookings/payments/summary
    // - Get payment summary (total spent, total payments, total refunded)
    // - Output: PaymentSummaryRespDTO
    // - Requires authentication
    @GetMapping("/payments/summary")
    public ResponseEntity<?> getPaymentSummary(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userBookingService.getPaymentSummary(principal.getUserId()));
    }

    // GET /users/bookings/history
    // - Get booking history of the user
    // - Output: List of bookings with booking id, PNR, train details, route, passengers, journey date, status, fare
    // - Requires authentication
    @GetMapping("/history")
    public ResponseEntity<?> getBookingHistory(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userBookingService.getBookingHistory(principal.getUserId()));
    }

    // GET /users/bookings/{bookingId}/details
    // - Get detailed view of a specific booking
    // - Output: Complete booking details with train, route, passengers, payment info
    // - Requires authentication
    // - User can only view their own bookings
    @GetMapping("/{bookingId}/details")
    public ResponseEntity<?> getBookingDetails(
            @PathVariable Long bookingId,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userBookingService.getBookingDetails(bookingId, principal.getUserId()));
    }

    // POST /users/bookings/cancel
    // - Cancel a confirmed booking if train has not yet departed
    // - Input: { bookingId, reason }
    // - Output: Cancellation confirmation message
    // - Requires authentication
    @PostMapping("/cancel")
    public ResponseEntity<?> cancelBooking(
            @RequestBody @Valid CancelBookingReqDTO reqDTO,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userBookingService.cancelBooking(reqDTO, principal.getUserId()));
    }

    // GET /users/bookings/stats
    // - Get booking statistics (total, confirmed, completed, cancelled counts)
    // - Output: BookingStatsRespDTO
    // - Requires authentication
    @GetMapping("/stats")
    public ResponseEntity<?> getBookingStats(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userBookingService.getBookingStats(principal.getUserId()));
    }

    // GET /users/bookings/saved-passengers
    // - Get list of saved passengers for the user
    // - Output: List of SavedPassengerRespDTO
    // - Requires authentication
    @GetMapping("/saved-passengers")
    public ResponseEntity<?> getSavedPassengers(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userBookingService.getSavedPassengers(principal.getUserId()));
    }

    // POST /users/bookings/saved-passengers
    // - Add a new saved passenger
    // - Input: { name, age, gender, preferredBerth }
    // - Output: SavedPassengerRespDTO
    // - Requires authentication
    @PostMapping("/saved-passengers")
    public ResponseEntity<?> addSavedPassenger(
            @RequestBody @Valid SavedPassengerReqDTO reqDTO,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userBookingService.addSavedPassenger(reqDTO, principal.getUserId()));
    }

    // PUT /users/bookings/saved-passengers/{passengerId}
    // - Update saved passenger details
    // - Input: { name, age, gender, preferredBerth }
    // - Output: SavedPassengerRespDTO
    // - Requires authentication
    // - User can only update their own saved passengers
    @PutMapping("/saved-passengers/{passengerId}")
    public ResponseEntity<?> updateSavedPassenger(
            @PathVariable Long passengerId,
            @RequestBody @Valid SavedPassengerReqDTO reqDTO,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userBookingService.updateSavedPassenger(passengerId, reqDTO, principal.getUserId()));
    }

    // DELETE /users/bookings/saved-passengers/{passengerId}
    // - Delete a saved passenger
    // - Output: Success message
    // - Requires authentication
    // - User can only delete their own saved passengers
    @DeleteMapping("/saved-passengers/{passengerId}")
    public ResponseEntity<?> deleteSavedPassenger(
            @PathVariable Long passengerId,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userBookingService.deleteSavedPassenger(passengerId, principal.getUserId()));
    }
}