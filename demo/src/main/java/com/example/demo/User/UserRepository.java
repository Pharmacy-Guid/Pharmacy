package com.example.demo.User;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUsername(String username);

    @Query(value = "select * from User u where u.username=:n and u.password=:p",nativeQuery = true)
    User logIn(@Param("n") String username, @Param("p") String password);
}