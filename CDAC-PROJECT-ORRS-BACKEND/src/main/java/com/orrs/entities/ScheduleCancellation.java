package com.orrs.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "schedule_cancellations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleCancellation extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private TrainSchedule schedule;

    private String reason; // e.g., "Heavy Rainfall", "Technical Glitch"
    
    private LocalDateTime cancelledAt = LocalDateTime.now();
    
    private String cancelledBy; // Admin ID
    
    private Boolean notificationTriggered = false;
}
