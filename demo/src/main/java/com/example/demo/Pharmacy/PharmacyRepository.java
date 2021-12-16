package com.example.demo.Pharmacy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.*;
import com.example.demo.Pharmacy.Pharmacy;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;


public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {

    @Query(value="select p from Pharmacy p where p.name=:n")
    public Pharmacy findByName(@Param("n") String name);
    @Transactional
    public void deleteByName(String name);
}

