package com.example.server.models;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity
@Table(name="TRIPS")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="TRAVELER")
    private String traveler;

    @Column(name="DESTINATION")
    private int destination;

    @Column(name="BUDGET")
    private float budget;

    @Column(name="TIME")
    private String time;

    @Column(name="GOAL")
    private String goal;

    public Trip(String traveler, int destination, float budget, String time, String goal) {
        this.traveler = traveler;
        this.destination = destination;
        this.budget = budget;
        this.time = time;
        this.goal = goal;
    };
}
