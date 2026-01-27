package com.orrs.dto.response;

import java.time.LocalDateTime;

import com.orrs.enums.AccountStatus;
import com.orrs.enums.Gender;
import com.orrs.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserRespDTO {

    private Long id;
    private String fullName;
    private String email;
    private String mobile;
    private Gender gender;
    private Role role;
    private AccountStatus status;
    private String aadharNo;
    private String address;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}