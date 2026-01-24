package com.orrs.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.orrs.dto.request.AuthReqDTO;
import com.orrs.dto.request.RegisterReqDTO;
import com.orrs.dto.request.UpdatePasswordReqDTO;
import com.orrs.dto.request.UpdateUserReqDTO;
import com.orrs.dto.response.AuthRespDTO;
import com.orrs.security.JwtUtils;
import com.orrs.security.UserPrincipal;
import com.orrs.services.UserService;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@CrossOrigin(origins= "*")
public class UserController {

	private final UserService userService;
	private final AuthenticationManager authManager;
	private final JwtUtils jwtUtils;
	
//	 POST /users/register
//	   - Register new user account
//	   - Input: { fullName, email, password, cnfPassword mobile }
//	   - Output: { message, status, data(userId), time_stamp }
//     - Doesn't require authentication
	@PostMapping("/register")
	public ResponseEntity<?> resisterUser(@RequestBody @Valid RegisterReqDTO regDto){
		//Error :- RequestBody must be imported from org.springframework.web.bind.annotation
		System.out.println(regDto);
		return ResponseEntity.ok(userService.registerNewUser(regDto));
	}
	
//	 GET /users/{userId}
//	   - Get user profile details
//	   - Output: {message, status, data( userId, fullName, email, mobile, gender, dob, address, preferredClass), time_stamp }
//	   - Requires authentication
//	   - User can only view their own profile (or admin can view any)
	@GetMapping("/me")
	public ResponseEntity<?> getUserDetails(@AuthenticationPrincipal UserPrincipal principal){
		return ResponseEntity.ok(userService.getUserDetails(principal.getUserId()));
	}

//	PUT /users/update/{userId}
//	   - Update user profile
//	   - Input: {  userId, fullName, email, mobile, gender, dob, address, preferredClass }
//	   - Output: Updated user object mapped to UserDetailsRespDTO
//	   - Requires authentication
//	   - Cannot update password, role through this end_point

	@PutMapping("/update/me")
	public ResponseEntity<?> updateUserDetails(@RequestBody @Valid UpdateUserReqDTO updatedUserDto, @AuthenticationPrincipal UserPrincipal principal){
		return ResponseEntity.ok(userService.updateUserDetails(updatedUserDto, principal.getUserId()));
	}
	
//	 PATCH /users/update/password/{userId}
//	   - Change user password
//	   - Input: { oldPassword, newPassword, newCnfPassword }
//	   - Output: { message, status, data(null), time_stamp }
//	   - Requires authentication
//	   - Validates old password before updating
	@PatchMapping("/update/password")
	public ResponseEntity<?> updateUserPassword(@RequestBody @Valid  UpdatePasswordReqDTO passwordDto,  @AuthenticationPrincipal UserPrincipal principal){
		return ResponseEntity.ok(userService.updateUserPassword(passwordDto, principal.getUserId()));
	}
	
//	 DELETE /users/{userId}
//	   - Soft delete user account
//	   - Sets user status to deleted
//	   - Requires authentication (user end_point)
	@DeleteMapping("/me")
	public ResponseEntity<?> deleteAccount(@AuthenticationPrincipal UserPrincipal principal){
		return ResponseEntity.ok(userService.deleteAccount(principal.getUserId()));
	}

	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody @Valid AuthReqDTO authReq){
		
		Authentication holder = new UsernamePasswordAuthenticationToken(authReq.getEmail(), authReq.getPassword());
	    System.out.println("IsAuthenticated" +holder.isAuthenticated());
		Authentication fullyAuth = authManager.authenticate(holder);
		System.out.println("IsAuthenticated" + fullyAuth.isAuthenticated());
		
		UserPrincipal principal = (UserPrincipal) fullyAuth.getPrincipal();
        return ResponseEntity.ok(new AuthRespDTO(jwtUtils.generateToken(principal), "Login Successfull"));
	}
	
}
