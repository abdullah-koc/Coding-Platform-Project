package com.example.backend.repositories;

import com.example.backend.dto.UserStatsDto;
import com.example.backend.entities.Attempt;
import com.example.backend.entities.Person;
import com.example.backend.entities.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public User signUp(User user) {
        String last_user_id;
        int user_id_count;
        String last_user_id_sql = "SELECT user_id FROM users WHERE LENGTH(user_id) >= ALL(SELECT LENGTH(user_id) FROM users) ORDER BY user_id DESC LIMIT 1";
        try {
            last_user_id = (String) jdbcTemplate.queryForObject(last_user_id_sql, String.class);
            user_id_count = Integer.parseInt(last_user_id.substring(1));
            user_id_count++;
        } catch (EmptyResultDataAccessException e) {
            user_id_count = 0;
        }

        String user_id = "U" + user_id_count;
        jdbcTemplate.update(
                "INSERT INTO people (person_id, full_name, email, password, nickname, birth_date) VALUES (?, ?, ?, ?, ?, ?)",
                user_id, user.getFull_name(), user.getEmail(), user.getPassword(), user.getNickname(), user.getBirth_date());

        return user;
    }

    public User findByEmail(String email) {

        String sql = "SELECT * FROM users u , people p WHERE p.person_id = u.user_id and p.email = ?";
        try {
            return (User) jdbcTemplate.queryForObject(sql, new Object[]{email}, new BeanPropertyRowMapper(User.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public User findByNickname(String nickname) {
        String sql = "SELECT * FROM users u, people p WHERE p.person_id = u.user_id and p.nickname = ?";
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

    public void updatePhoto(String user_id, String photo) {
        String sql = "UPDATE people SET photo = ? WHERE person_id = ?";
        jdbcTemplate.update(sql, photo, user_id);
    }

    public List<UserStatsDto> getUserStats(String nickname) {
        String sql = "SELECT * FROM statusBar s WHERE s.nickname = ?";
        try {
            return jdbcTemplate.query(sql, new Object[]{nickname}, new BeanPropertyRowMapper<>(UserStatsDto.class));
        } catch(EmptyResultDataAccessException e) {
            return null;
        }
    }
}