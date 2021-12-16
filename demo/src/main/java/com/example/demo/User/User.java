package com.example.demo.User;

import com.example.demo.Pharmacy.Pharmacy;
import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "user")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;
    private String name;
    private String email;
    private String address;
    private String password;

    @OneToOne(fetch = FetchType.EAGER)
    private Pharmacy pharmacy;

    public User() {
    }

    public User(Long id, String username, String name, String email, String address, String password) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.address = address;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}