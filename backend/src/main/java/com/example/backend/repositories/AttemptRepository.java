package com.example.backend.repositories;

import com.example.backend.entities.Attempt;
import com.example.backend.entities.TestCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Repository
public class AttemptRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertAttempt(Attempt attempt) {
        String last_attempt_id;
        int attempt_id_count;
        String last_attempt_id_sql = "SELECT attempt_id FROM attempts WHERE LENGTH(attempt_id) >= ALL(SELECT LENGTH(attempt_id) FROM attempts) ORDER BY attempt_id DESC LIMIT 1";
        try {
            last_attempt_id = (String) jdbcTemplate.queryForObject(last_attempt_id_sql, String.class);
            attempt_id_count = Integer.parseInt(last_attempt_id.substring(1));
            attempt_id_count++;
        } catch (EmptyResultDataAccessException e) {
            attempt_id_count = 0;
        }

        String attemptId = "A" + attempt_id_count;
        attempt.setAttempt_id(attemptId);

        String tempSql = "SELECT title FROM question_contest WHERE question_id = ?";
        String questionTitle = (String) jdbcTemplate.queryForObject(tempSql, String.class, attempt.getQuestion_id());

        if (questionTitle.equals("") || questionTitle == null) {
            String sql = "INSERT INTO attempts(attempt_id, user_answer, try_count, is_solved, is_contest, user_id, question_id, programming_language) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql, attemptId, attempt.getUser_answer(), 1, true, true, attempt.getUser_id(),
                    attempt.getQuestion_id(), attempt.getProgramming_language());
        } else {
            String sql = "INSERT INTO attempts(attempt_id, user_answer, try_count, is_solved, user_id, question_id, programming_language) VALUES(?, ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql, attemptId, attempt.getUser_answer(), 1, true, attempt.getUser_id(),
                    attempt.getQuestion_id(), attempt.getProgramming_language());
        }
    }

    public void insertAttemptTestCase(Attempt attempt, TestCase testCase) {
        String sql = "INSERT INTO attempt_test_case(attempt_id, test_case_id, is_passed) VALUES(?, ?, ?)";
        jdbcTemplate.update(sql, attempt.getAttempt_id(), testCase.getTest_case_id(), new Random().nextBoolean());

        String attempt_test_case_sql = "SELECT * FROM attempt_test_case WHERE attempt_id = ? AND test_case_id = ? AND is_passed = ?";
        try {
            if (jdbcTemplate.queryForMap(attempt_test_case_sql,
                    new Object[] { attempt.getAttempt_id(), testCase.getTest_case_id(), false }) != null) {
                String update_is_solved = "UPDATE attempts SET is_solved = ? WHERE attempt_id = ?";
                jdbcTemplate.update(update_is_solved, false, attempt.getAttempt_id());
                attempt.setIs_solved(false);
            }
        } catch (EmptyResultDataAccessException e) {

        }
    }

    public List<Attempt> findAllAttemptsOnQuestion(String question_id) {
        String sql = "SELECT * FROM attempts WHERE question_id = ?";

        try {
            return (ArrayList<Attempt>) jdbcTemplate.query(sql, new Object[] { question_id },
                    new BeanPropertyRowMapper(Attempt.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<Attempt> findUserOwnAttempts(String userId, String questionId) {
        String sql = "SELECT * FROM attempts WHERE user_id = ? AND question_id = ?";

        try {
            return jdbcTemplate.query(sql, new Object[] { userId, questionId },
                    new BeanPropertyRowMapper(Attempt.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
