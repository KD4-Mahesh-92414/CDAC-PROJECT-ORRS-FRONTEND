package com.orrs.dto.response;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TrainCoachRespDTO {

	private Long coachTypeId;       // Useful for the frontend to send back during booking
    private String coachCode;       // "SL", "3A"
    private String coachName;       // "Sleeper", "AC 3 Tier"
    private String coachImageUrl;   // <--- NEW: URL for the seat layout image
 
    private BigDecimal fare;        // Dynamic Fare
    private Integer availableSeats; 
    private String status;          // "AVAILABLE", "WL", "RAC"
	    
}

 