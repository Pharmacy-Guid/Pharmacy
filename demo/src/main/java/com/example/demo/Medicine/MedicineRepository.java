package com.example.demo.Medicine;


import com.example.demo.Pharmacy.Pharmacy;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.*;
@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {



    @Transactional
//    @OnDelete(action = OnDeleteAction.CASCADE)
    @Cascade(CascadeType.ALL)
    void deleteMedicineByName(String name);

 Medicine findMedicineById(Long id);

    Medicine findMedicineByName(String name);

    @Query(value="select * from Medicine m  where m.name like %:n% or m.name like %:m% or m.name  like %:o%",nativeQuery = true)
    List<Medicine> searchMultiple(@Param("n") String Name,@Param("m") String Name2,@Param("o") String Name3);

    @Query(value="select * from Medicine m  where m.name like %:n% or m.name like %:m% ",nativeQuery = true)
    List<Medicine> searchMultiple(@Param("n") String Name,@Param("m") String Name2);

    @Query(value="select * from Medicine m  where m.name like %:n% ",nativeQuery = true)
    List<Medicine> searchMultiple(@Param("n") String Name);

//    @Query(value = "update Pharmacy  p set p.medicine=:m where p.name=:n")
//    Pharmacy updateMedicine(@Param("m")Medicine medicine, @Param("n")String name);
}
