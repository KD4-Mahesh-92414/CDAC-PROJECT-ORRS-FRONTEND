package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.orrs.dto.request.AddTrainReqDTO;
import com.orrs.dto.request.UpdateTrainReqDTO;
import com.orrs.dto.request.UpdateTrainStatusReqDTO;
import com.orrs.security.UserPrincipal;
import com.orrs.services.TrainService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/trains")
@CrossOrigin(origins = "*")
public class AdminTrainController {

    private final TrainService trainService;

    // GET /admin/trains
    // - Fetch all trains
    // - Requires ADMIN authentication
    @GetMapping
    public ResponseEntity<?> getAllTrains() {
        return ResponseEntity.ok(trainService.getAllTrains());
    }

    // POST /admin/trains
    // - Add new train
    // - Input: TrainReqDTO
    // - Requires ADMIN authentication
    @PostMapping
    public ResponseEntity<?> addTrain(
            @RequestBody @Valid AddTrainReqDTO addTrainReqDTO) {

        return ResponseEntity.ok(trainService.addTrain(addTrainReqDTO));
    }

    // PUT /admin/trains/{trainId}
    // - Update train details
    // - Input: UpdateTrainReqDTO
    // - Requires ADMIN authentication
    @PutMapping("/{trainId}")
    public ResponseEntity<?> updateTrain(
            @PathVariable Long trainId,
            @RequestBody @Valid UpdateTrainReqDTO updateTrainReqDTO) {

        return ResponseEntity.ok(
                trainService.updateTrain(trainId, updateTrainReqDTO));
    }

    // DELETE /admin/trains/{trainId}
    // - Soft delete train
    // - Requires ADMIN authentication
    @DeleteMapping("/{trainId}")
    public ResponseEntity<?> deleteTrain(
            @PathVariable Long trainId) {

        return ResponseEntity.ok(
                trainService.deleteTrain(trainId));
    }
    
    // PATCH /admin/trains/{trainId}/status
    // - Update train status (e.g. ACTIVE / INACTIVE)
    // - Requires ADMIN authentication
    @PatchMapping("/{trainId}/status")
    public ResponseEntity<?> updateTrainStatus(
         @PathVariable Long trainId,
         @RequestBody @Valid UpdateTrainStatusReqDTO dto ) 
    {
     return ResponseEntity.ok(
             trainService.updateTrainStatus(trainId, dto)
     );
 }

}
