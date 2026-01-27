package com.orrs.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingStatsRespDTO {

    private Long totalBookings;
    private Long confirmedBookings;
    private Long completedBookings;
    private Long cancelledBookings;
}