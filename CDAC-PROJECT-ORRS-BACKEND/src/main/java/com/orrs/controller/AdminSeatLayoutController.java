package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.orrs.dto.request.AddSeatLayoutReqDTO;
import com.orrs.dto.request.UpdateSeatLayoutReqDTO;
import com.orrs.services.SeatLayoutService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/seat-layouts")
@CrossOrigin(origins = "*")
public class AdminSeatLayoutController {

    private final SeatLayoutService seatLayoutService;

    // GET /admin/seat-layouts
    // - Fetch all seat layouts
    // - Requires ADMIN authentication
    @GetMapping
    public ResponseEntity<?> getAllSeatLayouts() {
        return ResponseEntity.ok(seatLayoutService.getAllSeatLayouts());
    }

    // POST /admin/seat-layouts
    // - Add new seat layout
    // - Input: AddSeatLayoutReqDTO
    // - Requires ADMIN authentication
    @PostMapping
    public ResponseEntity<?> addSeatLayout(
            @RequestBody @Valid AddSeatLayoutReqDTO addSeatLayoutReqDTO) {

        return ResponseEntity.ok(
                seatLayoutService.addSeatLayout(addSeatLayoutReqDTO));
    }

    // PUT /admin/seat-layouts/{seatLayoutId}
    // - Update seat layout details
    // - Input: UpdateSeatLayoutReqDTO
    // - Requires ADMIN authentication
    @PutMapping("/{seatLayoutId}")
    public ResponseEntity<?> updateSeatLayout(
            @PathVariable Long seatLayoutId,
            @RequestBody @Valid UpdateSeatLayoutReqDTO updateSeatLayoutReqDTO) {

        return ResponseEntity.ok(
                seatLayoutService.updateSeatLayout(seatLayoutId, updateSeatLayoutReqDTO));
    }

    // DELETE /admin/seat-layouts/{seatLayoutId}
    // - Delete seat layout
    // - Requires ADMIN authentication
    @DeleteMapping("/{seatLayoutId}")
    public ResponseEntity<?> deleteSeatLayout(
            @PathVariable Long seatLayoutId) {

        return ResponseEntity.ok(
                seatLayoutService.deleteSeatLayout(seatLayoutId));
    }
}