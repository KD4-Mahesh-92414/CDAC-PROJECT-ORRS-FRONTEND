package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orrs.dto.request.RegisterReqDTO;
import com.orrs.dto.request.UpdatePasswordReqDTO;
import com.orrs.dto.request.UpdateUserReqDTO;
import com.orrs.services.UserService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

	private final UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> resisterUser(@RequestBody @Valid RegisterReqDTO regDto){
		
		return ResponseEntity.ok(userService.registerNewUser(regDto));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserDetails(@PathVariable @NotNull @Min(1) Long id){
		return ResponseEntity.ok(userService.getUserDetails(id));
	}

	@PutMapping("/update/{userId}")
	public ResponseEntity<?> updateUserDetails(@RequestBody @Valid UpdateUserReqDTO updatedUserDto, @PathVariable @NotNull Long userId){
		return ResponseEntity.ok(userService.updateUserDetails(updatedUserDto, userId));
	}
	
	@PatchMapping("/update/password/{userId}")
	public ResponseEntity<?> updateUserPassword(@RequestBody @Valid  UpdatePasswordReqDTO passwordDto, @PathVariable @NotNull Long userId){
		return ResponseEntity.ok(userService.updateUserPassword(passwordDto, userId));
	}
	
	


	
}
