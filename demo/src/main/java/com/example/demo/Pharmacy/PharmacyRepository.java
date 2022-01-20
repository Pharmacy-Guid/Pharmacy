package com.example.demo.Pharmacy;

import com.example.demo.Medicine.Medicine;
import com.example.demo.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.*;
import com.example.demo.Pharmacy.Pharmacy;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {

    @Query(value="select p from Pharmacy p where p.name=:n")
    Pharmacy findByName(@Param("n") String name);
     Pharmacy findPharmacyById(Long id);
    Pharmacy findPharmaciesByUser(User u);

}