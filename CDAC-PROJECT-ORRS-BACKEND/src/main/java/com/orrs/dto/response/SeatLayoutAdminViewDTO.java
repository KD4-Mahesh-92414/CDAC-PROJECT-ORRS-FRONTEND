package com.orrs.dto.response;

import com.orrs.enums.SeatType;

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
public class SeatLayoutAdminViewDTO {

    private Long id;
    private Long coachTypeId;
    private String coachTypeCode;
    private String coachTypeName;
    private Integer seatNumber;
    private SeatType seatType;
}