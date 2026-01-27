package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orrs.dto.request.PNRStatusReqDTO;
import com.orrs.services.PNRStatusService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/pnr")
@CrossOrigin(origins = "*")
public class PNRStatusController {

    private final PNRStatusService pnrStatusService;

    // POST /pnr/status
    // - Check PNR status and get booking details
    // - Input: { pnrNumber }
    // - Output: Complete booking details with train route and passenger information
    // - Public endpoint (no authentication required)
    @PostMapping("/status")
    public ResponseEntity<?> checkPNRStatus(@RequestBody @Valid PNRStatusReqDTO reqDTO) {
        return ResponseEntity.ok(pnrStatusService.checkPNRStatus(reqDTO));
    }
}