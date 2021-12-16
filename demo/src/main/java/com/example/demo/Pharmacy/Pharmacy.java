package com.example.demo.Pharmacy;
import com.example.demo.Medicine.Medicine;
import com.example.demo.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "pharmacy")
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique = true)
    private String name;
    @Column(unique = true)
    private String phone;
    @Column(unique = true)
    private String email;

    @JsonIgnore
    @OneToOne (mappedBy = "pharmacy", fetch = FetchType.EAGER)
    private User user;


    private String addres;

    @ManyToMany()
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonIgnore(value = false )
    private List<Medicine> medicine;

    public Pharmacy() {
    }
    public Pharmacy(Pharmacy pharmacy,List<Medicine> m){
        this.name=pharmacy.getName();
        this.addres=pharmacy.getAddres();
        this.phone=pharmacy.getPhone();
        this.email=pharmacy.getEmail();
        this.id=pharmacy.getId();
        this.medicine=m;

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAddres() {
        return addres;
    }

    public void setAddres(String addres) {
        this.addres = addres;
    }

    public List<Medicine> getMedicine() {
        return medicine;
    }

    public void setMedicine(List<Medicine> medicine) {
        this.medicine = medicine;
    }

    @Override
    public String toString() {
        return "Pharmacy{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", user=" + user +
                ", addres='" + addres + '\'' +
                ", medicine=" + medicine +
                '}';
    }

    public  void addMedicine(Medicine m) {
        medicine.add(m);
    }
}