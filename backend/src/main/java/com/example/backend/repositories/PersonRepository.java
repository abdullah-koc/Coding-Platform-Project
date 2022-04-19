package com.example.backend.repositories;

import com.example.backend.entities.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
        try {
            return (Person) jdbcTemplate.queryForObject(sql, new Object[]{email}, new BeanPropertyRowMapper(Person.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Person findById(String person_id) {
        String sql = "SELECT * FROM PEOPLE WHERE person_id = ?";
        try {
            return (Person) jdbcTemplate.queryForObject(sql, new Object[]{person_id}, new BeanPropertyRowMapper(Person.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public void updatePassword(String person_id, String password) {
        String sql = "UPDATE people SET password = ? WHERE person_id = ?";
        jdbcTemplate.update(sql, password, person_id);
    }

    public void updatePhone(String person_id, String phone) {
        String sql = "UPDATE people SET phone = ? WHERE person_id = ?";
        jdbcTemplate.update(sql, phone, person_id);
    }

    public void updatePhoto(String person_id, String photo) {
        String sql = "UPDATE people SET photo = ? WHERE person_id = ?";
        jdbcTemplate.update(sql, photo, person_id);
    }
}
