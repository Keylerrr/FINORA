package com.FINORA.BACKEND.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "goals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Double targetAmount;

    private Double currentAmount;

    private LocalDate targetDate;

    private String description;

        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;
    }
