package com.example.demo.Medicine;


import com.example.demo.Pharmacy.Pharmacy;
import com.example.demo.Pharmacy.PharmacyRepository;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Service;

import org.springframework.web.bind.annotation.*;


import java.util.List;




@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final PharmacyRepository pharmacyRepository;


    @Autowired
    public MedicineService(MedicineRepository medicineRepository, PharmacyRepository pharmacyRepository) {
        this.medicineRepository = medicineRepository;
        this.pharmacyRepository = pharmacyRepository;
    }




    public Medicine updateMedicine(String name, Medicine data) {

        Medicine medicine = medicineRepository.findByName(name);
        System.out.println(medicine);

        if (data != null) {
            if (data.getName() != null) medicine.setName(data.getName());
            if (data.getDescription() != null) medicine.setDescription(data.getDescription());
            if (data.getType() != null) medicine.setType(data.getType());
            if (data.getCategory() != null) medicine.setCategory(data.getCategory());
            medicineRepository.save(medicine);
        }
        return medicine;
    }

    public List<Medicine> getAllMedicine(){
        return medicineRepository.findAll();
    }

    public Medicine findMedicine(@PathVariable String name){
        return medicineRepository.findByName(name) ;
    }



    public List<Medicine> addMedicine(Medicine medicine, Pharmacy pharmacy){
        Pharmacy p =add(medicine,pharmacy);
//        pharmacyRepository.save(p);
        return p.getMedicine();
    }

    //Add Medicine
    public Pharmacy add(Medicine medicine, Pharmacy pharmacy){

        Pharmacy ph= pharmacyRepository.findByName(pharmacy.getName());
        ph.addMedicine(medicine);

        pharmacyRepository.save(ph);


        return ph;
    }

    public List<Medicine> search(String first,String second,String third) {
        return  medicineRepository.searchMultiple(first,second,third);
    }

    //Delete Medicine
    public void deleteMedicine(Long id){
        medicineRepository.deleteById(id);
    }
}

