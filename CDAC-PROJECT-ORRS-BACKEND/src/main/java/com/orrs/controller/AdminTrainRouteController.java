package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.orrs.dto.request.AddTrainRouteReqDTO;
import com.orrs.dto.request.UpdateTrainRouteReqDTO;
import com.orrs.services.TrainRouteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/train-routes")
@CrossOrigin(origins = "*")
public class AdminTrainRouteController {

    private final TrainRouteService trainRouteService;

    // GET /admin/train-routes
    // - Fetch all train routes
    // - Requires ADMIN authentication
    @GetMapping
    public ResponseEntity<?> getAllTrainRoutes() {
        return ResponseEntity.ok(trainRouteService.getAllTrainRoutes());
    }

    // POST /admin/train-routes
    // - Add new train route
    // - Input: AddTrainRouteReqDTO
    // - Requires ADMIN authentication
    @PostMapping
    public ResponseEntity<?> addTrainRoute(
            @RequestBody @Valid AddTrainRouteReqDTO addTrainRouteReqDTO) {

        return ResponseEntity.ok(
                trainRouteService.addTrainRoute(addTrainRouteReqDTO));
    }

    // PUT /admin/train-routes/{trainRouteId}
    // - Update train route details
    // - Input: UpdateTrainRouteReqDTO
    // - Requires ADMIN authentication
    @PutMapping("/{trainRouteId}")
    public ResponseEntity<?> updateTrainRoute(
            @PathVariable Long trainRouteId,
            @RequestBody @Valid UpdateTrainRouteReqDTO updateTrainRouteReqDTO) {

        return ResponseEntity.ok(
                trainRouteService.updateTrainRoute(trainRouteId, updateTrainRouteReqDTO));
    }

    // DELETE /admin/train-routes/{trainRouteId}
    // - Delete train route
    // - Requires ADMIN authentication
    @DeleteMapping("/{trainRouteId}")
    public ResponseEntity<?> deleteTrainRoute(
            @PathVariable Long trainRouteId) {

        return ResponseEntity.ok(
                trainRouteService.deleteTrainRoute(trainRouteId));
    }
}