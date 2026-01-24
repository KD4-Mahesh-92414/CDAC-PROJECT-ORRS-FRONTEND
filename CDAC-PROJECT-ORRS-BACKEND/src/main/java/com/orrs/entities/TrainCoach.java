package com.orrs.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "train_coaches")
@AttributeOverride(name="id", column = @Column(name="coach_id"))
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TrainCoach extends BaseEntity{


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "train_id", nullable = false)
    private Train train;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coach_type_id", nullable = false)
    private CoachType coachType;

    @Column(nullable = false, length = 10)
    private String coachLabel; // "S1", "B2"

    @Column(nullable = false)
    private Integer sequenceInTrain; // Order of coach in train engine sequence

    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(nullable = false)
    private Boolean isDeleted = false;

}