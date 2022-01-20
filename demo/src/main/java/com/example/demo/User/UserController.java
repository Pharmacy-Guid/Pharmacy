package com.example.demo.User;

import com.example.demo.Pharmacy.Pharmacy;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path="users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers(){
        return userService.getUsers();
    }
    @GetMapping("/{username}")
    public User getUser(@PathVariable String username){
        return userService.getUser(username);
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id,@RequestBody User data){
        return userService.updateUser(id,data);
    }

    @PostMapping("/addPharmacy")
    public Pharmacy addPharmacyToUser(@RequestBody Form data ){
//        System.out.println(data);
        return userService.addPharmacy(data.getUser(),data.getPharmacy());
    }

    @GetMapping("/pharmacy/{username}")
    public Pharmacy getPharmacy(@PathVariable String username){
        return userService.getPharmacy(username);
    }

}

class Form  {
    User user;
    Pharmacy pharmacy;

    public User getUser() {
        return user;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }


}
