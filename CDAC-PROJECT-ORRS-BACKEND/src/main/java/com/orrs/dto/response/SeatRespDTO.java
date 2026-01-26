package com.orrs.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SeatRespDTO {
    private Integer seatNumber;      // 1, 2, 3...
    private String seatType;         // "LOWER", "UPPER", "SIDE_LOWER"
    private String status;           // "AVAILABLE", "LOCKED", "MY_RESERVATION"
}
