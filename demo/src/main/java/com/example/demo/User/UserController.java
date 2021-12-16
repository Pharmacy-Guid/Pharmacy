package com.example.demo.User;



import org.springframework.web.bind.annotation.*;


import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping(path="user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }




    @GetMapping("")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable String id){
        return userService.getUser(Long.parseLong(id));

    }
//@GetMapping("byuser")
//public User findUSer(){
//       return  userService.search();
//}

    @PutMapping("/{username}")
    public void updateUser(User data,@PathVariable String username){
        userService.updateUser(username,data);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id){
        userService.deleteUser(Long.parseLong(id));

    }


    @PostMapping()
    public User addOne(@RequestBody User user){
        return userService.saveUser(user);
    }

    @PostMapping("/addPharmacy")
    public User addPharmacyToUser(@RequestBody User user){
        return userService.addPharmacy(user);
    }

    @GetMapping("/login")
    public User login(@RequestParam("username") String user,@RequestParam("password") String password )  {
        return   userService.Login(user,password);
    }
}
