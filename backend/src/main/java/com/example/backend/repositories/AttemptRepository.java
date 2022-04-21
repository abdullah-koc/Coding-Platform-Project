package com.example.backend.repositories;

import com.example.backend.entities.Attempt;
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


    public void insertAttempt(Attempt attempt) {
        String last_attempt_id;
        int attempt_id_count;
        String last_attempt_id_sql = "SELECT attempt_id FROM attempts ORDER BY attempt_id DESC LIMIT 1";
        try {
            last_attempt_id = (String) jdbcTemplate.queryForObject(last_attempt_id_sql, String.class);
            attempt_id_count = Integer.parseInt(last_attempt_id.substring(1));
            attempt_id_count++;
        } catch (EmptyResultDataAccessException e) {
            attempt_id_count = 0;
        }

        String attemptId = "A" + attempt_id_count;
        attempt.setAttempt_id(attemptId);

        String sql = "INSERT INTO attempts(attempt_id, user_answer, try_count, is_solved, user_id, question_id, programming_language) VALUES(?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, attemptId, attempt.getUser_answer(), 1, true, attempt.getUser_id(), attempt.getQuestion_id(), attempt.getProgramming_language());
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
