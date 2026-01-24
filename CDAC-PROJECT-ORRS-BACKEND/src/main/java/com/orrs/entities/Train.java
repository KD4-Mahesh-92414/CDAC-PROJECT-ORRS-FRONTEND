package com.orrs.entities;

import com.orrs.enums.TrainStatus;
import com.orrs.enums.TrainType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "trains")
@AttributeOverride(name="id", column = @Column(name="train_id"))
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Train extends BaseEntity{

    @Column(name = "train_number", unique = true, nullable = false, length = 10)
    private String trainNumber;

    @Column(name = "train_name", nullable = false, length = 100)
    private String trainName;

    @Column(name = "train_type", length = 50)
    @Enumerated(EnumType.STRING)
    private TrainType trainType;

    // Foreign Key linking to the Stations Entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "source_station_id", referencedColumnName = "station_id")
    private Station sourceStation;

    // Foreign Key linking to the Stations Entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_station_id", referencedColumnName = "station_id")
    private Station destinationStation;

    @Column(name = "total_distance_km")
    private Integer totalDistanceKm;

    @Column(name = "avg_speed")
    private Integer avgSpeed;

    @Column(name = "days_of_run", length = 50)
    private String daysOfRun; // Store as "Mon,Wed,Fri" 

    @Enumerated(EnumType.STRING)
    @Column(name = "train_active_status")
    private TrainStatus trainStatus = TrainStatus.ACTIVE;

}
