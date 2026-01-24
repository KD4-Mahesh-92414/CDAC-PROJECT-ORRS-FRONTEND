package com.orrs.entities;

import com.orrs.enums.StationStatus;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "stations")
@AttributeOverride(name="id", column = @Column(name="station_id"))
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Station extends BaseEntity{

    @Column(name = "station_code", nullable = false, length = 10)
    private String stationCode;

    @Column(name = "station_name", nullable = false, length = 100)
    private String stationName;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "state", length = 100)
    private String state;

    @Column(name = "zone", length = 50)
    private String zone;

    @Column(name = "platforms")
    private Integer platforms;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StationStatus status = StationStatus.ACTIVE;


}
