package com.example.demo.Pharmacy;

import com.example.demo.Medicine.Medicine;
import com.example.demo.User.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class PharmacyRepositoryTest {

    private final PharmacyRepository pharmacyRepository;

    @Autowired
    public PharmacyRepositoryTest(PharmacyRepository pharmacyRepository) {
        this.pharmacyRepository = pharmacyRepository;
    }

    @Test
    void itShouldAddPharmacy() {
        Pharmacy pharmacy = new Pharmacy(1L,"Pharmacy", "11123456", "Pharmacy@info.com", "Riyadh");
        Pharmacy savedPharmacy =pharmacyRepository.save(pharmacy);
        Pharmacy result = pharmacyRepository.findById(savedPharmacy.getId()).orElse(null);
        assertNotNull(result);
    }

    @Test
    void itShouldDeletePharmacy() {
        Pharmacy pharmacy = new Pharmacy(1L,"Pharmacy", "11123456", "Pharmacy@info.com", "Riyadh");
        pharmacyRepository.delete(pharmacy);
        Pharmacy oldPharmacy = pharmacyRepository.findPharmacyById(pharmacy.getId());
        assertThat(oldPharmacy).isNull();
    }

    @Test
    void itShouldFindPharmacy() {
        Pharmacy pharmacy = new Pharmacy(1L,"Pharmacy", "11123456", "Pharmacy@info.com", "Riyadh");
        pharmacyRepository.save(pharmacy);
        Pharmacy result = pharmacyRepository.findPharmacyById(pharmacy.getId());
        assertNotNull(result);
    }

    @Test
    void itShouldUpdatePharmacy() {
        Pharmacy pharmacy = new Pharmacy(1L,"Pharmacy", "11123456", "Pharmacy@info.com", "Riyadh");
        pharmacyRepository.save(pharmacy);
        Pharmacy result = pharmacyRepository.findPharmacyById(pharmacy.getId());
        result.setName("Pharmacy1");
        pharmacyRepository.save(result);
        assertNotEquals(result.getName(), pharmacy.getName());

    }
}
