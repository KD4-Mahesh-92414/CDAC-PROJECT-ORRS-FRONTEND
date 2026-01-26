package com.orrs.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingReqDTO {

    @NotNull(message = "Reservation ID is required")
    private Long reservationId;

    private Long sourceStationId;

    private Long destStationId;
    @NotEmpty(message = "Passengers list cannot be empty")
    @Valid
    private List<PassengerReqDTO> passengers;

    @NotBlank(message = "Contact email is required")
    @Email(message = "Invalid email format")
    private String contactEmail;

    @NotBlank(message = "Contact phone is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String contactPhone;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PassengerReqDTO {

        @NotBlank(message = "Passenger name is required")
        private String name;

        @NotNull(message = "Age is required")
        private Integer age;

        @NotBlank(message = "Gender is required")
        private String gender;

        private String seatPreference; // WINDOW, AISLE, LOWER, UPPER
    }
}