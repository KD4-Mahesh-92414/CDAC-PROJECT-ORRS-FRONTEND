package com.orrs.entities;


import java.math.BigDecimal;

import com.orrs.enums.Gender; // Assuming you have this Enum

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tickets")
@AttributeOverride(name="id", column = @Column(name="ticket_id"))
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Ticket extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(nullable = false)
    private String passengerName;

    @Column(nullable = false)
    private Integer age;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    // Seat Assignment Logic
    @Column(name = "coach_label") 
    private String coachLabel; // e.g., "S1", "B2" (Filled after allocation)

    @Column(name = "seat_number")
    private Integer seatNumber; // e.g., 45 (Filled after allocation)
    
    // Status specific to this passenger (e.g., if one person cancels but others don't)
    @Column(nullable = false)
    private String status = "CONFIRMED"; // CNF, RAC, WL

    @Column(name = "ticket_fare", precision = 10, scale = 2)
    private BigDecimal ticketFare;
}
