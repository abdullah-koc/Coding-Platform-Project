package com.example.backend.repositories;

import com.example.backend.dto.AttemptTestCaseDto;
import com.example.backend.entities.TestCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TestCaseRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public  void insertTestCase(TestCase testCase) {
        String last_test_case_id_of_question;
        int test_case_id_count;
        String last_test_case_id_sql = "SELECT test_case_id FROM test_cases WHERE coding_question_id = ? AND LENGTH(test_case_id) >= ALL(SELECT LENGTH(test_case_id) FROM test_cases) ORDER BY test_case_id DESC LIMIT 1";
        try {
            last_test_case_id_of_question = (String) jdbcTemplate.queryForObject(last_test_case_id_sql, new Object[]{testCase.getCoding_question_id()}, String.class);
            test_case_id_count = Integer.parseInt(last_test_case_id_of_question.substring(1));
            test_case_id_count++;
        } catch (EmptyResultDataAccessException e) {
            test_case_id_count = 0;
        }

        String test_case_id = "T" + test_case_id_count;
        String sql = "INSERT INTO test_cases(test_case_id, example_input, example_output, is_locked, coding_question_id) VALUES(?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, test_case_id, testCase.getExample_input(), testCase.getExample_output(), testCase.isIs_locked(), testCase.getCoding_question_id());
    }

    public List<TestCase> findTestCases(String codingQuestionId) {
        String sql = "SELECT * FROM test_cases WHERE coding_question_id = ?";

        try {
            return jdbcTemplate.query(sql, new Object[]{codingQuestionId},  new BeanPropertyRowMapper(TestCase.class));
        } catch(EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<AttemptTestCaseDto> getAllAttemptTestCaseMatches(String question_id, String user_id, String attempt_id) {
        try {
            String sql = "SELECT * FROM attempt_test_case WHERE question_id = ? AND user_id = ? AND attempt_id = ?";
            return jdbcTemplate.query(sql, new Object[] { question_id, user_id, attempt_id}, new BeanPropertyRowMapper(AttemptTestCaseDto.class));

        } catch(EmptyResultDataAccessException e) {
            System.out.println("null");
            return null;
        }
    }

    public TestCase findTestCaseById(String coding_question_id, String test_case_id) {
        try {
            String sql = "SELECT * FROM test_cases WHERE coding_question_id = ? AND test_case_id = ?";
            return jdbcTemplate.queryForObject(sql, new Object[] {coding_question_id, test_case_id}, new BeanPropertyRowMapper<>(TestCase.class));
        } catch(EmptyResultDataAccessException e) {
            return null;
        }
    }
}
