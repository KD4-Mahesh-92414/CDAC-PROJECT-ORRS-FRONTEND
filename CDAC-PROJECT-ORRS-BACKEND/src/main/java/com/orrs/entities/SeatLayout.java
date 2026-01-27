package com.orrs.entities;


import com.orrs.enums.SeatType;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "seat_layouts", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"coach_type_id", "seat_number"})
})
@AttributeOverride(name="id", column = @Column(name="seat_layout_id"))
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SeatLayout extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coach_type_id", nullable = false)
    private CoachType coachType;

    @Column(nullable = false)
    private Integer seatNumber; // 1 to 72 x (no of coachTypes)

    @Enumerated(EnumType.STRING)
    private SeatType seatType;

}