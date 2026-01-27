package com.orrs.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "coach_types")
@AttributeOverride(name="id", column = @Column(name="coach_type_id"))
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CoachType extends BaseEntity {

    @Column(unique = true, nullable = false, length = 20)
    private String typeCode; // e.g., "SL", "3A", "VANDE_EX"

    @Column(nullable = false)
    private String typeName; // e.g., "Sleeper Class"

    @Column(nullable = false)
    private Integer totalSeats;

    @Column(name = "coach_image_url")
    private String coachImageUrl; 

    private String description;
}
