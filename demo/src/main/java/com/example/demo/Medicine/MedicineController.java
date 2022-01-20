package com.example.demo.Medicine;


import com.example.demo.Pharmacy.Pharmacy;
import com.example.demo.Pharmacy.PharmacyService;
import com.example.demo.Pharmacy.PharmacyRepository;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@CrossOrigin("*")
@RestController
@RequestMapping(path="medicines")
public class MedicineController {

    private final MedicineService medicineService;
    private  final  PharmacyRepository pharmacyRepository;

//    private final MedicineRepository medicineRepository;

    public MedicineController(MedicineService medicineService, PharmacyRepository pharmacyRepository) {
        this.medicineService = medicineService;
        this.pharmacyRepository = pharmacyRepository;
    }

    @Autowired


    //View All Medicine
    @GetMapping
    public List<Medicine> getAllMedicine(){
        return medicineService.getAllMedicine();
    }

    //find for Medicine
    @GetMapping("/{name}")
    public Medicine findMedicine(@PathVariable String name){
        return medicineService.findMedicine(name);
    }


    //Add Medicine
    @PostMapping
    public List<Medicine> addMedicine(@RequestBody Form form){
        System.out.println(form.getMedicine());
        return medicineService.addMedicine(form.getMedicine(), form.getPharmacy());

    }

    @PutMapping("/{id}")
    public Medicine updateMedicine(@PathVariable("id") String id,@RequestBody Medicine medicine)
    {
    Long i=Long.parseLong(id);
        return  medicineService.updateMedicine(i,medicine);
    }

    //Search for Medicine
    @GetMapping("/search2")
    public List<Pharmacy> search(@RequestParam(name = "first") String first, @RequestParam(name = "second") String second) {

        List<Medicine> m = medicineService.search(first, second);

        boolean flag;
        List<Pharmacy> pharma = new ArrayList<>();
        List<Pharmacy> ph = pharmacyRepository.findAll();
        for (Pharmacy pharmacy : ph) {
            List<Medicine> med = new ArrayList<>();
            flag=false;

            for (Medicine medicine : m) {
                if (pharmacy.getMedicine().contains(medicine)) {

                    med.add(medicine);
                    flag=true;
                }
                else
                    continue;
            }

            if (flag==true){


                pharma.add(new Pharmacy(pharmacy,med));



            }

        }



        return pharma;
    }



    @GetMapping("/search1")
    public List<Pharmacy> search1(@RequestParam(name = "first") String first) {

        List<Medicine> m = medicineService.search(first);

        boolean flag;

        List<Pharmacy> pharma = new ArrayList<>();
        List<Pharmacy> ph = pharmacyRepository.findAll();
        for (Pharmacy pharmacy : ph) {
            List<Medicine> med = new ArrayList<>();
            flag=false;

            for (Medicine medicine : m) {
                if (pharmacy.getMedicine().contains(medicine)) {

                    med.add(medicine);
                    flag=true;
                }
                else
                    continue;
            }

            if (flag==true){
                pharma.add(new Pharmacy(pharmacy,med));
            }
        }
        return pharma;
    }

    @GetMapping("/search")
    public List<Pharmacy> search3(@RequestParam(name = "first") String first, @RequestParam(name = "second") String second,@RequestParam(name = "third") String third) {

        List<Medicine> m = medicineService.search(first, second, third);

        boolean flag;

        List<Pharmacy> pharma = new ArrayList<>();
        List<Pharmacy> ph = pharmacyRepository.findAll();
        for (Pharmacy pharmacy : ph) {
            List<Medicine> med = new ArrayList<>();
            flag=false;

            for (Medicine medicine : m) {
                if (pharmacy.getMedicine().contains(medicine)) {

                    med.add(medicine);
                    flag=true;
                }
                else
                    continue;
            }

            if (flag==true){


                pharma.add(new Pharmacy(pharmacy,med));



            }

        }



        return pharma;
    }





    @DeleteMapping("/{id}")
    public void DeleteMedicine(@PathVariable String id) {
        medicineService.deleteMedicine(Long.parseLong(id));

    }

}
class Form{
    Medicine medicine;
    Pharmacy pharmacy;

    public Medicine getMedicine() {
        return medicine;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }
}

