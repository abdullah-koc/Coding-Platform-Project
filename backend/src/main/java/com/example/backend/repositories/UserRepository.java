package com.example.backend.repositories;

import com.example.backend.entities.Person;
import com.example.backend.entities.User;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends PersonRepository{

    //@Query("INSERT INTO People (full_name, email, nickname, password, birth_date, )
    //VALUES (user.getFull_name(), user.getEmail(), user.getNickname(), user.getPassword(), user.getBirth_date()))
    User signUp(@Param("user") User user);
}
