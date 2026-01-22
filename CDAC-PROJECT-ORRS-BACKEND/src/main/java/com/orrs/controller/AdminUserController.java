package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orrs.dto.request.UpdateStatusReqDTO;
import com.orrs.services.UserService;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminUserController {

	private final UserService userService;
	
//	 GET /users/all (Admin only)
//	   - List all users
//	   - Admin feature
	@GetMapping("/users/all")
	public ResponseEntity<?> getAllUsers(){
		return ResponseEntity.ok(userService.getAllUsers());
	}
	
//	 DELETE /user/{userId}
//	   - input - {userId} 
//	   - Soft delete user account
//	   - Sets user status to deleted
//	   - Requires authentication (admin end_point)
	@PatchMapping("/users/{userId}")
	public ResponseEntity<?> suspendUsersAccount(@PathVariable @NotNull @Min(1) Long userId ){
		return ResponseEntity.ok(userService.suspendUserById(userId));
	}
	
	@PatchMapping("/users/update/status/{userId}")
	public ResponseEntity<?> updateUserStatus(@PathVariable @NotNull @Min(1) Long userId , @RequestBody UpdateStatusReqDTO dto){
		return ResponseEntity.ok(userService.updateUserStatus(userId, dto));
	}
}
