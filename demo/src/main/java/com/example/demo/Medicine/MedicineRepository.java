package com.example.demo.Medicine;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import java.util.*;
@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    void deleteMedicineByName(String name);


    Medicine findByName(String name);


    @Query(value="select * from Medicine m  where m.name like %:n% or m.name like %:m% or m.name  like %:o%",nativeQuery = true)
    List<Medicine> searchMultiple(@Param("n") String Name,@Param("m") String Name2,@Param("o") String Name3);

}
