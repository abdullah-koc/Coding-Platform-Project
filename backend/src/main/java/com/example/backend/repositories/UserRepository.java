package com.example.backend.repositories;

import com.example.backend.entities.Person;
import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends PersonRepository{

    //@Query(value = "INSERT INTO persons (full_name, email, nickname, password, birth_date )
    //VALUES (user.getFull_name(), user.getEmail(), user.getNickname(), user.getPassword(), user.getBirth_date())")
    //User signUp(@Param("user") User user);
}
