package com.example.server.models;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity
@Table(name="PLACES")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="CITY")
    private String city;

    public Place(String city) {
        this.city = city;
    };
}
