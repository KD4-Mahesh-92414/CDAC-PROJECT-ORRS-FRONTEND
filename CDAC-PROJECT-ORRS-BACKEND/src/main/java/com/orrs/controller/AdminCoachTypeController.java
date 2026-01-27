package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.orrs.dto.request.AddCoachTypeReqDTO;
import com.orrs.dto.request.UpdateCoachTypeReqDTO;
import com.orrs.services.CoachTypeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/coach-types")
@CrossOrigin(origins = "*")
public class AdminCoachTypeController {

    private final CoachTypeService coachTypeService;

    // GET /admin/coach-types
    // - Fetch all coach types
    // - Requires ADMIN authentication
    @GetMapping
    public ResponseEntity<?> getAllCoachTypes() {
        return ResponseEntity.ok(coachTypeService.getAllCoachTypes());
    }

    // POST /admin/coach-types
    // - Add new coach type
    // - Input: AddCoachTypeReqDTO
    // - Requires ADMIN authentication
    @PostMapping
    public ResponseEntity<?> addCoachType(
            @RequestBody @Valid AddCoachTypeReqDTO addCoachTypeReqDTO) {

        return ResponseEntity.ok(
                coachTypeService.addCoachType(addCoachTypeReqDTO));
    }

    // PUT /admin/coach-types/{coachTypeId}
    // - Update coach type details
    // - Input: UpdateCoachTypeReqDTO
    // - Requires ADMIN authentication
    @PutMapping("/{coachTypeId}")
    public ResponseEntity<?> updateCoachType(
            @PathVariable Long coachTypeId,
            @RequestBody @Valid UpdateCoachTypeReqDTO updateCoachTypeReqDTO) {

        return ResponseEntity.ok(
                coachTypeService.updateCoachType(coachTypeId, updateCoachTypeReqDTO));
    }

    // DELETE /admin/coach-types/{coachTypeId}
    // - Delete coach type
    // - Requires ADMIN authentication
    @DeleteMapping("/{coachTypeId}")
    public ResponseEntity<?> deleteCoachType(
            @PathVariable Long coachTypeId) {

        return ResponseEntity.ok(
                coachTypeService.deleteCoachType(coachTypeId));
    }
}