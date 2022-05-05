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
        String contestId;
        try {
            String tempSql = "SELECT contest_id FROM question_contest WHERE question_id = ?";
            contestId = (String) jdbcTemplate.queryForObject(tempSql, String.class, attempt.getQuestion_id());

        } catch(EmptyResultDataAccessException e) {
            contestId = "";
        }

        if (!contestId.equals("")) {
            String sql = "INSERT INTO attempts(attempt_id, user_answer, try_count, is_solved, is_contest, user_id, question_id, programming_language) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql, attemptId, attempt.getUser_answer(), 1, true, true, attempt.getUser_id(),
                    attempt.getQuestion_id(), attempt.getProgramming_language());
        } else {
            String sql_try_count = "SELECT max(try_count) FROM attempts WHERE user_id = ? AND question_id = ?";
            int try_count = 0;
            if(jdbcTemplate.queryForObject(sql_try_count, Integer.class, new Object[]{attempt.getUser_id(), attempt.getQuestion_id()}) != null) {
                try_count = jdbcTemplate.queryForObject(sql_try_count, Integer.class, new Object[]{attempt.getUser_id(), attempt.getQuestion_id()});
            }

            String sql_max_try = "SELECT max_try FROM questions WHERE question_id = ?";
            int max_try = jdbcTemplate.queryForObject(sql_max_try, Integer.class, attempt.getQuestion_id());
            if(try_count < max_try && !is_solved_correctly(attempt.getUser_id(), attempt.getQuestion_id())) {
                try_count++;
                String sql = "INSERT INTO attempts(attempt_id, user_answer, try_count, is_solved, user_id, question_id, programming_language) VALUES(?, ?, ?, ?, ?, ?, ?)";
                jdbcTemplate.update(sql, attemptId, attempt.getUser_answer(), try_count, true, attempt.getUser_id(),
                        attempt.getQuestion_id(), attempt.getProgramming_language());
            }
        }

    }

    public void insertAttemptTestCase(Attempt attempt, TestCase testCase) {
        if(findAttemptByAttemptId(attempt.getAttempt_id()) != null) {
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
    }

    public void updateUserPoint(Attempt attempt) {
        if(findAttemptByAttemptId(attempt.getAttempt_id()) != null) {
            try {
                String is_solved_sql = "SELECT is_solved FROM attempts WHERE attempt_id = ?";
                boolean is_solved = (boolean) jdbcTemplate.queryForObject(is_solved_sql, Boolean.class, attempt.getAttempt_id());
                List<Attempt> userAttempts = findUserOwnAttempts(attempt.getUser_id(), attempt.getQuestion_id());
                boolean already_solved_correctly = false;
                for(int i = 0; i < userAttempts.size() - 1; i++) {
                    if(userAttempts.get(i).isIs_solved())
                        already_solved_correctly = true;
                }
                if(is_solved && !already_solved_correctly) {
                    attempt.setIs_solved(true);
                    String find_question_point = "SELECT question_point FROM questions WHERE question_id = ?";
                    int point = (int) jdbcTemplate.queryForObject(find_question_point, Integer.class, attempt.getQuestion_id());

                    String current_user_point = "SELECT user_point FROM users WHERE user_id = ?";
                    int user_point = (int) jdbcTemplate.queryForObject(current_user_point, Integer.class, attempt.getUser_id());

                    point += user_point;
                    String update_user_point = "UPDATE users SET user_point = ? WHERE user_id = ?";
                    jdbcTemplate.update(update_user_point, point, attempt.getUser_id());
                }
            } catch (EmptyResultDataAccessException e) {

            }
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

    public Attempt findAttemptByAttemptId(String attempt_id) {
        String sql = "SELECT * FROM attempts WHERE attempt_id = ?";
        try {
            return (Attempt) jdbcTemplate.queryForObject(sql, new Object[] { attempt_id },
                    new BeanPropertyRowMapper(Attempt.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public boolean is_solved_correctly(String user_id, String question_id) {
        boolean is_solved = false;
        List<Attempt> userAttempts = findUserOwnAttempts(user_id, question_id);
        for(int i = 0; i < userAttempts.size(); i++) {
            if(userAttempts.get(i).isIs_solved())
                is_solved = true;
        }
        return is_solved;
    }
}
