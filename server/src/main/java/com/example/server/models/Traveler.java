package com.example.server.models;

import lombok.*;
import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Setter @Getter
@Entity
@Table(name="TRAVELERS")
public class Traveler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="NAME")
    private String name;

    @Column(name="POSITION")
    private String position;

    @Column(name="DEPARTMENT")
    private String department;

    @Column(name="PHONE")
    private String phone;

    @Column(name="EMAIL")
    private String email;

    public Traveler(String name, String position, String department, String phone, String email) {
        this.name = name;
        this.position = position;
        this.department = department;
        this.phone = phone;
        this.email = email;
    };
};