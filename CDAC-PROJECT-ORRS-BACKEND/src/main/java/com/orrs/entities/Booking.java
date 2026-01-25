package com.orrs.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.orrs.enums.BookingStatus;
import com.orrs.enums.BookingType;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "bookings")
@AttributeOverride(name="id", column = @Column(name="booking_id"))
@Getter
@Setter
@ToString(exclude = "tickets") // Prevent circular reference in logs
@NoArgsConstructor
@AllArgsConstructor
public class Booking extends BaseEntity {

    @Column(name = "pnr_number", unique = true, nullable = false, length = 20)
    private String pnrNumber; // Generated via UUID or Logic

    // Link to the User who made the booking
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; 

    // CRITICAL CHANGE: Links to the specific Daily Schedule (Date + Train)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id", nullable = false)
    private TrainSchedule schedule;

    // Defines the Class for this PNR (e.g., Sleeper, 3A)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coach_type_id", nullable = false)
    private CoachType coachType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "source_station_id", nullable = false)
    private Station sourceStation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_station_id", nullable = false)
    private Station destinationStation;

    // Redundant but useful for quick queries without joining Schedule
    @Column(nullable = false)
    private LocalDate journeyDate; 

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalFare;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private BookingStatus status = BookingStatus.CONFIRMED;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private BookingType bookingType = BookingType.INDIVIDUAL;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate = LocalDateTime.now();

    // One Booking has Many Passengers (Tickets)
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ticket> tickets = new ArrayList<>();

    // Helper method to add tickets easily
    public void addTicket(Ticket ticket) {
        tickets.add(ticket);
        ticket.setBooking(this);
    }
}
