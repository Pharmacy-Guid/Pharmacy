package com.example.demo.Pharmacy;

import com.example.demo.User.*;
import com.example.demo.Medicine.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="pharmacy")
@CrossOrigin("*")
public class PharmacyController {


    private final PharmacyService pharmacyService;


    public PharmacyController(PharmacyService pharmacyService) {
        this.pharmacyService = pharmacyService;
    }

    @GetMapping("")
    public List<Pharmacy> getPharmacies(){
        return pharmacyService.getPharmacies();
    }


    @PostMapping
    public Pharmacy register(@RequestBody Pharmacy pharmacy){
        return pharmacyService.register(pharmacy);
    }

    @PutMapping("/{name}")
    public Pharmacy updatePharmacy(@PathVariable String name, @RequestBody Pharmacy  data){
        return pharmacyService.updatePharmacy(name, data);
    }
    @GetMapping(value = "/{name}")
    public Pharmacy getPharmacy(@PathVariable String name){
        return  pharmacyService.getPharmacy(name);
    }

    @DeleteMapping("/{name}")
    public void DeletePharmacy(@PathVariable("name") String name){
        pharmacyService.deletePharmacy(name);
    }


}

