package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.orrs.dto.request.AddStationReqDTO;
import com.orrs.dto.request.UpdateStationReqDTO;
import com.orrs.dto.request.UpdateStationStatusReqDTO;
import com.orrs.services.StationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/stations")
@CrossOrigin(origins = "*")
public class AdminStationController {

    private final StationService stationService;

    // GET /admin/stations
    // - Fetch all stations
    // - Requires ADMIN authentication
    @GetMapping
    public ResponseEntity<?> getAllStations() {
        return ResponseEntity.ok(stationService.getAllStations());
    }

    // POST /admin/stations
    // - Add new station
    // - Input: AddStationReqDTO
    // - Requires ADMIN authentication
    @PostMapping
    public ResponseEntity<?> addStation(
            @RequestBody @Valid AddStationReqDTO addStationReqDTO) {

        return ResponseEntity.ok(
                stationService.addStation(addStationReqDTO));
    }

    // PUT /admin/stations/{stationId}
    // - Update station details
    // - Input: UpdateStationReqDTO
    // - Requires ADMIN authentication
    @PutMapping("/{stationId}")
    public ResponseEntity<?> updateStation(
            @PathVariable Long stationId,
            @RequestBody @Valid UpdateStationReqDTO updateStationReqDTO) {

        return ResponseEntity.ok(
                stationService.updateStation(stationId, updateStationReqDTO));
    }
    
 // PATCH /admin/stations/{stationId}/status
 // - Update station status
 // - Input: UpdateStationStatusReqDTO
 // - Requires ADMIN authentication
 @PatchMapping("/{stationId}/status")
 public ResponseEntity<?> updateStationStatus(
         @PathVariable Long stationId,
         @RequestBody @Valid UpdateStationStatusReqDTO updateStationStatusReqDTO) {

     return ResponseEntity.ok(
             stationService.updateStationStatus(stationId, updateStationStatusReqDTO));
 }


    // DELETE /admin/stations/{stationId}
    // - Soft delete station
    // - Requires ADMIN authentication
    @DeleteMapping("/{stationId}")
    public ResponseEntity<?> deleteStation(
            @PathVariable Long stationId) {

        return ResponseEntity.ok(
                stationService.deleteStation(stationId));
    }
}
