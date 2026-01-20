package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orrs.dto.request.RegisterDTO;
import com.orrs.services.UserService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

	private final UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> resisterUser(@RequestBody RegisterDTO regDto){
		
		return ResponseEntity.ok(userService.registerNewUser(regDto));
	}


	
}
