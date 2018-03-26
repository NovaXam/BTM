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

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name="TRAVELER_ID")
    private Traveler traveler;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name="DESTINATION_ID")
    private Place destination;

    @Column(name="BUDGET")
    private float budget;

    @Column(name="TIME")
    private String time;

    @Column(name="GOAL")
    private String goal;

    @Column(name="STATUS")
    private int status;


    public Trip(Traveler traveler, Place destination, float budget, String time, String goal) {
        this.traveler = traveler;
        this.destination = destination;
        this.budget = budget;
        this.time = time;
        this.goal = goal;
        this.status = status;
    };
}
