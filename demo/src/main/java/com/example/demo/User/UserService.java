package com.example.demo.User;




import com.example.demo.Pharmacy.Pharmacy;
import com.example.demo.Pharmacy.PharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final PharmacyRepository pharmacyRepository;

    @Autowired
    public UserService(UserRepository userRepository, PharmacyRepository pharmacyRepository) {
        this.userRepository = userRepository;
        this.pharmacyRepository = pharmacyRepository;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Long user){
        return userRepository.findById(user).orElse(null);
    }

    public User addOne(User user){
        return userRepository.save(user);

    }

    public void deleteUser(Long user){
        userRepository.deleteById(user);
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public User Login(String username,String password)  {
        User user=  userRepository.logIn(username,password);
        if (user!=null)
            return  user;
        else
            throw  null;
    }

    public  void updateUser(String name,User data){
        User user=userRepository.findUserByUsername(name);
        if(user!=null){
            user.setAddress(data.getAddress());
            user.setEmail(data.getEmail());
            user.setUsername(data.getUsername());
            user.setName(data.getName());
            user.setPassword(data.getPassword());
            userRepository.save(user);
        }
    }


    public User addPharmacy(User user) {
        User u = userRepository.findById(user.getId()).orElse(null);
        Pharmacy p = pharmacyRepository.findById(user.getPharmacy().getId()).orElse(null);

        u.setPharmacy(p);
        return userRepository.save(u);
    }
}
