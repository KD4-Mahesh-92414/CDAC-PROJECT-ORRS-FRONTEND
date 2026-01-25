package com.orrs.enums;


public enum BookingStatus {
    
    CONFIRMED,       // Seat assigned (CNF)
    CANCELLED,       // User cancelled the ticket    
    PENDING,         // Payment initiated but not yet successful   
    FAILED,          // Payment failed or Timeout    
    WAITING_LIST,    // No seat assigned yet (WL)   
    RAC,             // Reservation Against Cancellation (Half seat/Shared)   
    PARTIALLY_CANCELLED // Some passengers in the PNR cancelled, others are traveling
}
