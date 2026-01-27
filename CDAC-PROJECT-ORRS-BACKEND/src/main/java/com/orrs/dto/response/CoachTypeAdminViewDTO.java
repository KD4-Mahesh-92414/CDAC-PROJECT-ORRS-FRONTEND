package com.orrs.dto.response;

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
public class CoachTypeAdminViewDTO {

    private Long id;
    private String typeCode;
    private String typeName;
    private Integer totalSeats;
    private String coachImageUrl;
    private String description;
}