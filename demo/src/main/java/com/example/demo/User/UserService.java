package com.example.demo.User;

import com.example.demo.Pharmacy.Pharmacy;
import com.example.demo.Pharmacy.PharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static java.lang.Long.parseLong;

@Service
public class UserService implements UserDetailsService{
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final PharmacyRepository pharmacyRepository;

    @Autowired
    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder, PharmacyRepository pharmacyRepository) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.pharmacyRepository = pharmacyRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user= userRepo.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("User not exist");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

            authorities.add(new SimpleGrantedAuthority(user.getRole()));


        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),authorities);
    }

    public List<User> getUsers(){
        return userRepo.findAll();
    }
    public User getUser(String username){
        return userRepo.findByUsername(username);
    }
    public User createUser(User user){

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public User updateUser(String id,User data){
        long longId = parseLong(id);

        User user = userRepo.findById(longId).orElse(null);
        if (data != null) {

            if (data.getName() != null) user.setName(data.getName());
            if (data.getUsername() != null) user.setUsername(data.getUsername());
            if (data.getEmail() != null) user.setEmail(data.getEmail());
            if (data.getAddres() != null) user.setAddres(data.getAddres());

        }

        return userRepo.save(user);
    }
    public Pharmacy addPharmacy(User user, Pharmacy pharmacy){
        User u = userRepo.findByUsername(user.getUsername());
        pharmacy.setUser(u);
        pharmacyRepository.save(pharmacy);
        u.setPharmacy(pharmacy);

        userRepo.save(u);
        return pharmacy;
    }

    public Pharmacy getPharmacy(String username){
       User u= userRepo.findByUsername(username);
       Long id=u.getId();
      return pharmacyRepository.findPharmaciesByUser(u);
    }

}

