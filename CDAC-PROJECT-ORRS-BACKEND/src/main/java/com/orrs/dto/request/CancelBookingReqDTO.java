package com.orrs.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CancelBookingReqDTO {

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    @NotBlank(message = "Cancellation reason is required")
    private String reason;
}