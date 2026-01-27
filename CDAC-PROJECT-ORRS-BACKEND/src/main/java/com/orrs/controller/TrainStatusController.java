package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orrs.services.TrainStatusService;

import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/trains")
@CrossOrigin(origins = "*")
public class TrainStatusController {

    private final TrainStatusService trainStatusService;

    // GET /trains/cancelled-rescheduled
    // - Get all cancelled and rescheduled trains
    // - Output: List of train status with details like train number, name, route, date, reason, status
    // - Public endpoint (no authentication required)
    @GetMapping("/cancelled-rescheduled")
    public ResponseEntity<?> getCancelledAndRescheduledTrains() {
        return ResponseEntity.ok(trainStatusService.getCancelledAndRescheduledTrains());
    }
}