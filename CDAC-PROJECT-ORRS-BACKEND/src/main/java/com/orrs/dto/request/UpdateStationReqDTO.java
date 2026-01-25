package com.orrs.dto.request;

import com.orrs.enums.StationStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStationReqDTO {

    @NotBlank(message = "Station code is required")
    @Size(max = 10, message = "Station code must be at most 10 characters")
    private String stationCode;

    @NotBlank(message = "Station name is required")
    @Size(max = 100, message = "Station name must be at most 100 characters")
    private String stationName;

    @Size(max = 100, message = "City must be at most 100 characters")
    private String city;

    @Size(max = 100, message = "State must be at most 100 characters")
    private String state;

    @Size(max = 50, message = "Zone must be at most 50 characters")
    private String zone;

    @Min(value = 1, message = "Platforms must be at least 1")
    private Integer platforms;

    @NotNull(message = "Station status is required")
    private StationStatus status;
}
