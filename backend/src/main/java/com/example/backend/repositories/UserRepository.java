package com.example.backend.repositories;

import com.example.backend.entities.Company;
import com.example.backend.entities.Person;
import com.example.backend.entities.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

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
/*
class UserRowMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {

        User user = new User();
        user.setFull_name(rs.getString("full_name"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setCompany_phone(rs.getString("company_phone"));
        user.setCompany_address(rs.getString("company_address"));

        return user;

    }
}*/
