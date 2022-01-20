package com.example.demo.Pharmacy;

import com.example.demo.User.*;
import com.example.demo.Medicine.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="pharmacies")
@CrossOrigin("*")
public class PharmacyController {
    private final PharmacyService pharmacyService;
    private final MedicineRepository medicineRepository;


    public PharmacyController(PharmacyService pharmacyService, MedicineRepository medicineRepository) {
        this.pharmacyService = pharmacyService;
        this.medicineRepository = medicineRepository;
    }

    @GetMapping("")
    public List<Pharmacy> getPharmacies() {
        return pharmacyService.getPharmacies();
    }


    @PostMapping
    public Pharmacy register(@RequestBody Pharmacy pharmacy) {
        return pharmacyService.register(pharmacy);
    }

    @PutMapping("/{id}")
    public Pharmacy updatePharmacy(@PathVariable String id, @RequestBody Pharmacy data) {

        return pharmacyService.updatePharmacy(Long.parseLong(id), data);
    }

    @GetMapping(value = "/{name}")
    public Pharmacy getPharmacy(@PathVariable String name) {
        return pharmacyService.getPharmacy(name);
    }

    @DeleteMapping("/{id}")
    public void DeletePharmacy(@PathVariable("id") String id) {
        pharmacyService.deletePharmacy(Long.parseLong(id));
    }

}

