package com.example.demo.Medicine;


import com.example.demo.Pharmacy.Pharmacy;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.*;
@Entity
@Table(name = "medicine")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @Column(unique = true)
    private String name;
    private String description;
    private String type;
    private String category;



    public Medicine() {
    }

    public Medicine(Long id, String name, String description, String type, String category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Medicine{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", type='" + type + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}