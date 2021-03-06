package com.example.demo.Pharmacy;



import org.springframework.stereotype.Service;
//import com.example.
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Service
public class PharmacyService {

    private final PharmacyRepository pharmacyRepository;

    public PharmacyService(PharmacyRepository pharmacyRepository) {
        this.pharmacyRepository = pharmacyRepository;
    }

    public List<Pharmacy> getPharmacies(){
        return pharmacyRepository.findAll();
    }



    public Pharmacy updatePharmacy(Long id, Pharmacy data){


        Pharmacy pharmacy = pharmacyRepository.findPharmacyById(id);

        if (data != null){
            if (data.getName() != null) pharmacy.setName(data.getName());
            if (data.getPhone() != null) pharmacy.setPhone(data.getPhone());
            if (data.getAddres() != null) pharmacy.setAddres(data.getAddres());
            if (data.getEmail() != null) pharmacy.setEmail(data.getEmail());
            pharmacyRepository.save(pharmacy);
        }
        return pharmacy;
    }

    public  Pharmacy register(Pharmacy pharmacy){
        return pharmacyRepository.save(pharmacy);
    }
    public Pharmacy getPharmacy(String name){
        return pharmacyRepository.findByName(name);
    }

    public void deletePharmacy(Long id){

        pharmacyRepository.deleteById(id);
    }

    Pharmacy addMedicine(Pharmacy p){
        return pharmacyRepository.save(p);
    }

}