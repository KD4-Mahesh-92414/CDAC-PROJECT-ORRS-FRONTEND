package com.orrs.entities;

import com.orrs.enums.Gender;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "saved_passengers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SavedPassenger extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // The account owner

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer age;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    // Optional: Senior Citizen preference, berth preference, etc.
    private String preferredBerth; 
}
