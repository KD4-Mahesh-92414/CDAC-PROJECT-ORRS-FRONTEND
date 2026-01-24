package com.orrs.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.AllArgsConstructor;
import java.time.LocalTime;

import com.orrs.enums.StopType;

@Entity
@AttributeOverride(name="id", column = @Column(name="train_route_id"))
@Table(
    name = "train_routes",
    uniqueConstraints = {
    	// Ensures a train doesn't have the same sequence number twice
        @UniqueConstraint(columnNames = {"train_id", "sequence_no"}),
        // Ensures a train doesn't visit the same station twice in the same route
        @UniqueConstraint(columnNames = {"train_id", "station_id"})
    }
)
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TrainRoute extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "train_id", nullable = false)
    private Train train;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id", nullable = false)
    private Station station;

    @Column(nullable = false)
    private Integer sequenceNo;

    private LocalTime arrivalTime;
    private LocalTime departureTime;
    
    private Integer haltMinutes;
    private Integer distanceFromSource;
     
    @Column(name = "day_number")
    private Integer dayNumber = 1 ; 

    @Column(nullable = false)
    private Boolean isMajorStation = false; // Helps in UI filtering

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StopType stopType = StopType.REGULAR;
   
     // Helper to identify if passengers can actually book this stop
     
    public boolean isBookable() {
        return this.stopType != StopType.TECHNICAL;
    }
}
