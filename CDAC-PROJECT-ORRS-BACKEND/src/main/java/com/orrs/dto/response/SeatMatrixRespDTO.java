package com.orrs.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SeatMatrixRespDTO {
    private String coachLabel;       // "S1", "B2"
    private List<SeatRespDTO> seats; // The grid of seats inside this coach
}
