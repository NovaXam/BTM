package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity
@Table(name="TRIPS")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="EMPLOYEE_ID")
//    @JsonBackReference
    private Traveler traveler;

    @ManyToOne
    @JoinColumn(name="CITY_ID")
//    @JsonBackReference
    private Place city;

    @Column(name="BUDGET")
    private float budget;

    @Column(name="TIME")
    private Date time;

    @Column(name="GOAL")
    private String goal;

    @Column(name="STATUS_TRIP")
    private int status;

    public Trip(Traveler traveler, Place city, float budget, Date time, String goal, int status) {
        this.traveler = traveler;
        this.city = city;
        this.budget = budget;
        this.time = time;
        this.goal = goal;
        this.status = status;
    };
};