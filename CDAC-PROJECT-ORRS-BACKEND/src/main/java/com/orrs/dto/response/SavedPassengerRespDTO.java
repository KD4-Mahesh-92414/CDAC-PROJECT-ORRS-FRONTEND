package com.orrs.dto.response;

import com.orrs.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SavedPassengerRespDTO {

    private Long id;
    private String name;
    private Integer age;
    private Gender gender;
    private String preferredBerth;
}