package com.example.demo.Medicine;


import com.example.demo.Pharmacy.*;
import com.example.demo.Medicine.*;
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
    private  final PharmacyController pharmacyController;

    @Autowired
    public MedicineService(MedicineRepository medicineRepository, PharmacyRepository pharmacyRepository,PharmacyController pharmacyController) {
        this.medicineRepository = medicineRepository;
        this.pharmacyRepository = pharmacyRepository;
        this.pharmacyController=pharmacyController;
    }




    public Medicine updateMedicine(Long id, Medicine data) {

        Medicine medicine = medicineRepository.findMedicineById(id);

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

    public Medicine findMedicine(String name){
        return medicineRepository.findMedicineByName(name);
    }





    //Add Medicine
    public List<Medicine> addMedicine(Medicine medicine, Pharmacy pharmacy){
        Pharmacy p =add(medicine,pharmacy);
        //    pharmacyRepository.save(p);
        return p.getMedicine();
    }

    //Add Medicine
    public Pharmacy add(Medicine medicine, Pharmacy pharmacy){
        Pharmacy ph= pharmacyRepository.findByName(pharmacy.getName());
        medicineRepository.save(medicine);
        ph.addMedicine(medicine);
        pharmacyRepository.save(ph);
        return ph;
    }

    public List<Medicine> search(String first,String second,String third) {
        return  medicineRepository.searchMultiple(first,second,third);
    }

    public List<Medicine> search(String first,String second) {
        return  medicineRepository.searchMultiple(first,second);
    }

    public List<Medicine> search(String first) {
        return  medicineRepository.searchMultiple(first);
    }

    //Delete Medicine
    public void deleteMedicine(Long id){
        medicineRepository.deleteById(id);
    }
}


