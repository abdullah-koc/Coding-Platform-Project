package com.example.backend.repositories;

import com.example.backend.entities.Person;
import com.example.backend.entities.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private int count = 0;

    public User signUp(User user) {
        String user_id = "U" + count;
        jdbcTemplate.update(
                "INSERT INTO people (person_id, full_name, email, password, nickname, birth_date) VALUES (?, ?, ?, ?, ?, ?)",
                user_id, user.getFull_name(), user.getEmail(), user.getPassword(), user.getNickname(), user.getBirth_date());

        count++;
        return user;
    }

    public User findByEmail(String email) {

        String sql = "SELECT u.* FROM users u , people p WHERE p.person_id = u.user_id and p.email = ?";
        try {
            return (User) jdbcTemplate.queryForObject(sql, new Object[]{email}, new BeanPropertyRowMapper(User.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public User findByNickname(String nickname) {
        String sql = "SELECT u.* FROM users u, people p WHERE p.person_id = u.user_id and p.nickname = ?";
        try {
            return (User) jdbcTemplate.queryForObject(sql, new Object[]{nickname}, new BeanPropertyRowMapper(User.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public void updateSchool(String user_id, String school) {
        String sql = "UPDATE users SET school = ? WHERE user_id = ?";
        jdbcTemplate.update(sql, school, user_id);
    }

    public void updateDepartment(String user_id, String department) {
        String sql = "UPDATE users SET department = ? WHERE user_id = ?";
        jdbcTemplate.update(sql, department, user_id);
    }

    public void updateCurrentCompany(String user_id, String cur_company) {
        String sql = "UPDATE users SET cur_company = ? WHERE user_id = ?";
        jdbcTemplate.update(sql, cur_company, user_id);
    }
}