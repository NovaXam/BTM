package com.example.server.models;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Setter @Getter
@Entity
@Table(name="USERS")
public class User {

    @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

    @Column(name="USER_NAME")
    private String userName;

    @Column(name="USER_PASSWORD")
    private String userPassword;


    public User(String userName, String userPassword) {
        this.userPassword = userPassword;
        this.userName = userName;
    };
}