package com.example.backend.repositories;

import com.example.backend.entities.Attempt;
import com.example.backend.entities.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class AttemptRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private int count = 0;

    public void insertAttempt(Attempt attempt) {
        String attemptId = "A" + count;
        String sql = "INSERT INTO attempts(attempt_id, user_answer, try_count, is_solved, user_id, question_id, programming_language) VALUES(?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, attemptId, attempt.getUser_answer(), 1, true, attempt.getUser_id(), attempt.getQuestion_id(), attempt.getProgramming_language());
        count++;
    }

    public List<Attempt> findAllAttemptsOnQuestion(String question_id) {
        String sql = "SELECT * FROM attempts WHERE question_id = ?";

        try {
            List<Attempt> list = (ArrayList<Attempt>) jdbcTemplate.query(sql, new Object[]{question_id},  new BeanPropertyRowMapper(Attempt.class));
            System.out.println(list.get(0));
            return (ArrayList<Attempt>) jdbcTemplate.query(sql, new Object[]{question_id},  new BeanPropertyRowMapper(Attempt.class));
        } catch(EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<Attempt> findUserOwnAttempts(String userId, String questionId) {
        String sql = "SELECT * FROM attempts WHERE user_id = ? AND question_id = ?";

        try {
            return jdbcTemplate.query(sql, new Object[]{userId, questionId},  new BeanPropertyRowMapper(Attempt.class));
        } catch(EmptyResultDataAccessException e) {
            return null;

        }
    }
}
