package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orrs.dto.request.AdminCreateUserReqDTO;
import com.orrs.dto.request.AdminUpdateUserReqDTO;
import com.orrs.dto.request.UpdateStatusReqDTO;
import com.orrs.services.AdminUserService;
import com.orrs.services.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/users")
@CrossOrigin(origins = "*")
public class AdminUserController {

    private final AdminUserService adminUserService;
    private final UserService userService; // For existing admin methods

    // GET /admin/users
    // - Get all users for admin panel (using existing UserService method)
    // - Output: List of users with all details
    // - Requires ADMIN role authentication
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // GET /admin/users/{userId}
    // - Get specific user details by ID
    // - Output: User details with all information
    // - Requires ADMIN role authentication
    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(adminUserService.getUserById(userId));
    }

    // POST /admin/users
    // - Create new user from admin panel
    // - Input: { fullName, email, mobile, gender, role, status, aadharNo?, address? }
    // - Output: Created user details
    // - Requires ADMIN role authentication
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUser(@RequestBody @Valid AdminCreateUserReqDTO reqDTO) {
        return ResponseEntity.ok(adminUserService.createUser(reqDTO));
    }

    // PUT /admin/users/{userId}
    // - Update user details from admin panel
    // - Input: { fullName, email, mobile, gender, role, status, aadharNo?, address? }
    // - Output: Updated user details
    // - Requires ADMIN role authentication
    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody @Valid AdminUpdateUserReqDTO reqDTO) {
        return ResponseEntity.ok(adminUserService.updateUser(userId, reqDTO));
    }

    // PATCH /admin/users/{userId}/status
    // - Update user account status (using existing UserService method)
    // - Input: { status }
    // - Output: Success message
    // - Requires ADMIN role authentication
    @PatchMapping("/{userId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserStatus(@PathVariable Long userId, @RequestBody @Valid UpdateStatusReqDTO statusDto) {
        return ResponseEntity.ok(userService.updateUserStatus(userId, statusDto));
    }

    // PATCH /admin/users/{userId}/suspend
    // - Suspend user account (using existing UserService method)
    // - Output: Success message
    // - Requires ADMIN role authentication
    @PatchMapping("/{userId}/suspend")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> suspendUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.suspendUserById(userId));
    }

    // DELETE /admin/users/{userId}
    // - Soft delete user account
    // - Sets user status to deleted and modifies email/mobile
    // - Requires ADMIN role authentication
    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        return ResponseEntity.ok(adminUserService.deleteUser(userId));
    }
}