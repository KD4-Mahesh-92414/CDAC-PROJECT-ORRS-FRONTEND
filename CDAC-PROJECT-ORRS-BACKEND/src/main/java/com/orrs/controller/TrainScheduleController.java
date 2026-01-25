package com.orrs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orrs.dto.request.TrainSearchReqDTO;
import com.orrs.services.TrainScheduleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class TrainScheduleController {
	
	private final TrainScheduleService trainScheduleService;
	
	@GetMapping("/search")
	public ResponseEntity<?> searchTrains(@RequestBody @Valid TrainSearchReqDTO searchDto){
		
		return ResponseEntity.ok(trainScheduleService.searchTrains(searchDto));
	}
	
	

}
