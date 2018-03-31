package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor @NoArgsConstructor @Setter @Getter
@Entity
@Table(name="TRAVELERS")
public class Traveler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employee_id;

    @Column(name="EMPLOYEE_NAME")
    private String employeeName;

    @Column(name="POSITION")
    private String position;

    @Column(name="DEPARTMENT")
    private String department;

    @Column(name="PHONE")
    private String phone;

    @Column(name="EMAIL")
    private String email;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "traveler")
    @Column(nullable = true)
    private Set<Trip> trips = new HashSet<Trip>();

    public Traveler(String name) {
        this.employeeName = name;
    };

    public Traveler(String name, String position, String department, String phone, String email) {
        this.employeeName = name;
        this.position = position;
        this.department = department;
        this.phone = phone;
        this.email = email;
    };
};