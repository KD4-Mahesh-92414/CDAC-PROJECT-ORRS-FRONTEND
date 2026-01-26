package com.orrs.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orrs.dto.common.ApiResponseDTO;
import com.orrs.dto.request.SeatMatrixReqDTO;
import com.orrs.dto.response.SeatMatrixRespDTO;
import com.orrs.security.UserPrincipal;
import com.orrs.services.SeatMatrixService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatMatrixController {

    private final SeatMatrixService seatMatrixService;

    // Using POST because we are sending a Request Body DTO
    @PostMapping("/matrix")
    public ResponseEntity<ApiResponseDTO<List<SeatMatrixRespDTO>>> getSeatMatrix(
            @Valid @RequestBody SeatMatrixReqDTO reqDTO,
            @AuthenticationPrincipal UserPrincipal principal) {
        
        return ResponseEntity.ok(seatMatrixService.getSeatMatrix(reqDTO, principal.getUserId()));
    }
}