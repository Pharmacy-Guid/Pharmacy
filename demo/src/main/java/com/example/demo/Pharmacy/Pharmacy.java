package com.example.demo.Pharmacy;

import com.example.demo.Medicine.Medicine;
import com.example.demo.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler","pharmacy","role"})
    private User user;

    private String addres;

    @ManyToMany(cascade = CascadeType.ALL)
//    @Cascade(org.hibernate.annotations.CascadeType.ALL)
//    @JsonIgnore(value = false )
    private List<Medicine> medicine;

    public Pharmacy() {
    }
    public Pharmacy(Pharmacy pharmacy,List<Medicine> m){
        this.name=pharmacy.getName();
        this.addres=pharmacy.getAddres();
        this.phone=pharmacy.getPhone();
        this.email=pharmacy.getEmail();
        this.id=pharmacy.getId();
        this.setMedicine(m);

    }

    public Pharmacy(Long id, String name, String phone, String email, User user, String addres, List<Medicine> medicine) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.user = user;
        this.addres = addres;
        this.medicine = medicine;
    }


    public Pharmacy(Long id, String name, String phone, String email, String addres) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.addres = addres;

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
        System.out.println("added here");
        this.medicine.add(m);
    }
}
