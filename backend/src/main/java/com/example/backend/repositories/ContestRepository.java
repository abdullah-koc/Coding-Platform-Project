package com.example.backend.repositories;

import java.util.List;

import com.example.backend.entities.Contest;
import com.example.backend.entities.Question;
import com.example.backend.entities.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ContestRepository {

   @Autowired
   private JdbcTemplate jdbcTemplate;

   public List<Contest> findAll() {
      String sql = "SELECT * FROM contests";
      return jdbcTemplate.query(sql, (rs, rowNum) -> {
         Contest contest = new Contest();
         contest.setContest_id(rs.getString("contest_id"));
         contest.setContest_name(rs.getString("contest_name"));
         contest.setContest_photo(rs.getString("contest_photo"));
         contest.setStart_date(rs.getDate("start_date"));
         contest.setEnd_date(rs.getDate("end_date"));
         contest.setPrize(rs.getString("prize"));
         contest.setCreation_time(rs.getDate("creation_date"));
         return contest;
      });
   }

   public void insertContest(Contest contest) {
      String sql = "INSERT INTO contests (contest_id, contest_name, contest_photo, start_date, end_date, prize, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
      jdbcTemplate.update(sql, contest.getContest_id(), contest.getContest_name(), contest.getContest_photo(),
            contest.getStart_date(), contest.getEnd_date(), contest.getPrize(), contest.getCreation_time());
   }

   public void updateContest(String contest_id, Contest contest) {
      String sql = "UPDATE contests SET contest_name = ?, contest_photo = ?, start_date = ?, end_date = ?, prize = ?, creation_date = ? WHERE contest_id = ?";
      jdbcTemplate.update(sql, contest.getContest_name(), contest.getContest_photo(), contest.getStart_date(),
            contest.getEnd_date(), contest.getPrize(), contest.getCreation_time(), contest_id);
   }

   public void deleteContest(String contest_id) {
      String sql = "DELETE FROM contests WHERE contest_id = ?";
      jdbcTemplate.update(sql, contest_id);
   }

   public List<Contest> getAllContestsByPersonId(String person_id) {
      String sql = "SELECT contest_id, contest_name, contest_photo, start_date, end_date, prize, creation_date FROM contests NATURAL JOIN user_contest WHERE person_id = ?";
      return jdbcTemplate.query(sql, (rs, rowNum) -> {
         Contest contest = new Contest();
         contest.setContest_id(rs.getString("contest_id"));
         contest.setContest_name(rs.getString("contest_name"));
         contest.setContest_photo(rs.getString("contest_photo"));
         contest.setStart_date(rs.getDate("start_date"));
         contest.setEnd_date(rs.getDate("end_date"));
         contest.setPrize(rs.getString("prize"));
         contest.setCreation_time(rs.getDate("creation_date"));
         return contest;
      }, person_id);
   }

   public List<Question> getAllQuestions(String contest_id) {
      String sql = "SELECT question_id, title, explanation, question_duration, difficulty, question_point, solution, max_try, like_count, dislike_count, creation_date FROM questions NATURAL JOIN question_contest WHERE contest_id = ?";
      return jdbcTemplate.query(sql, (rs, rowNum) -> {
         Question question = new Question();
         question.setQuestion_id(rs.getString("question_id"));
         question.setTitle(rs.getString("title"));
         question.setExplanation(rs.getString("explanation"));
         question.setQuestion_duration(rs.getInt("question_duration"));
         question.setDifficulty(rs.getString("difficulty"));
         question.setQuestion_point(rs.getInt("question_point"));
         question.setSolution(rs.getString("solution"));
         question.setMax_try(rs.getInt("max_try"));
         question.setLike_count(rs.getInt("like_count"));
         question.setDislike_count(rs.getInt("dislike_count"));
         question.setCreation_date(rs.getDate("creation_date"));
         return question;
      }, contest_id);
   }

   public List<User> getAllContestants(String contest_id) {
      String sql = "SELECT person_id, full_name, photo, email, phone FROM users NATURAL JOIN user_contest WHERE contest_id = ?";
      return jdbcTemplate.query(sql, (rs, rowNum) -> {
         User user = new User();
         user.setPerson_id(rs.getString("person_id"));
         user.setFull_name(rs.getString("full_name"));
         user.setPhoto(rs.getString("photo"));
         user.setEmail(rs.getString("email"));
         user.setPhone(rs.getString("phone"));
         return user;
      }, contest_id);
   }

   public Contest getContestById(String contest_id) {
      String sql = "SELECT * FROM contests WHERE contest_id = ?";
      return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
         Contest contest = new Contest();
         contest.setContest_id(rs.getString("contest_id"));
         contest.setContest_name(rs.getString("contest_name"));
         contest.setContest_photo(rs.getString("contest_photo"));
         contest.setStart_date(rs.getDate("start_date"));
         contest.setEnd_date(rs.getDate("end_date"));
         contest.setPrize(rs.getString("prize"));
         contest.setCreation_time(rs.getDate("creation_date"));
         return contest;
      }, contest_id);
   }

   public void insertQuestion(String contest_id, String question_id) {
      String sql = "INSERT INTO question_contest (contest_id, question_id) VALUES (?, ?)";
      jdbcTemplate.update(sql, contest_id, question_id);
   }

   public void insertContestant(String contest_id, String user_id) {
      String sql = "INSERT INTO user_contest (contest_id, person_id) VALUES (?, ?)";
      jdbcTemplate.update(sql, contest_id, user_id);
   }

}
