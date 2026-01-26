package com.orrs.dto.request;

import com.orrs.enums.TrainStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTrainStatusReqDTO {

    @NotNull
    private TrainStatus status;
}