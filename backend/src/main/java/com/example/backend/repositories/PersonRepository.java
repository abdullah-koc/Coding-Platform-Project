package com.example.backend.repositories;

import com.example.backend.entities.Company;
import com.example.backend.entities.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class PersonRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Person signUp(Person person) {
        if(findByEmail(person.getEmail()) != null ) {
            throw new RuntimeException("Person already exists");
        }
        jdbcTemplate.update(

                "INSERT INTO people(person_id, full_name, email, nickname, password, birth_date) VALUES ('U1', ?, ?, ?, ?, ?)",
                person.getFull_name(), person.getEmail(), person.getNickname(), person.getPassword(), person.getBirth_date());
        return person;
    }

    public Person findByEmail(String email) {
        String sql = "SELECT * FROM PEOPLE WHERE email = ?";
        return (Person) jdbcTemplate.queryForObject(sql, new Object[]{email}, new BeanPropertyRowMapper(Person.class));
    }
}
