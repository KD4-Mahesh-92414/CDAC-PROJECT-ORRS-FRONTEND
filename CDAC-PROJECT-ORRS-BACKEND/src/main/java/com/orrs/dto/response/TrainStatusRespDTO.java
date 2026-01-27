package com.orrs.dto.response;

import java.time.LocalDate;

import com.orrs.enums.ScheduleStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainStatusRespDTO {

    private Long scheduleId;
    private String trainNumber;
    private String trainName;
    private String route; // "Mumbai Central → New Delhi"
    private LocalDate scheduledDate;
    private ScheduleStatus status;
    private String reason;
    private String remarks;
}