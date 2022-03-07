package com.example.backend.repositories;

import com.example.backend.entities.Person;
import com.example.backend.entities.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public User signUp(User user) {
        jdbcTemplate.update(
                "INSERT INTO persons (full_name, email, nickname, password, birth_date ) VALUES (?, ?, ?, ?, ?)",
                user.getFull_name(), user.getEmail(), user.getNickname(), user.getPassword(), user.getBirth_date());
        return user;
    }
}
