package com.orrs.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardStatsRespDTO {

    private Long totalTrains;
    private Long totalActiveTrains;
    private Long totalStations;
    private Long totalActiveStations;
    private Long totalScheduledTrains;
    private Long totalBookingsToday;
    private Long totalUsersRegistered;
}