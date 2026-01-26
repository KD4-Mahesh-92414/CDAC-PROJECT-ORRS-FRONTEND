package com.orrs.dto.request;

import com.orrs.enums.StationStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateStationStatusReqDTO {

    @NotNull(message = "Station status is required")
    private StationStatus status;
}
