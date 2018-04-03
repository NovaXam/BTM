package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "city")
    @Column(nullable = true)
    private Set<Trip> trips = new HashSet<Trip>();

    public Place(String city) {
        this.cityName = city;
    };
};