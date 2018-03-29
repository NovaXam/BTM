package com.example.server.models;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity
@Table(name="PLACES")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long city_id;

    @Column(name="CITY_NAME")
    private String cityName;

    @OneToMany(mappedBy = "city")
    private Set<Trip> trips = new HashSet<Trip>();

    public Place(String city) {
        this.cityName = city;
    };
};