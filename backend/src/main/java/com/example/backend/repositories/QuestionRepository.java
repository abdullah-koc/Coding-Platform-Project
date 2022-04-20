package com.example.backend.repositories;

import java.util.List;

import com.example.backend.dto.QuestionDto;
import com.example.backend.entities.CodingQuestion;
import com.example.backend.entities.NonCodingQuestion;
import com.example.backend.entities.Question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class QuestionRepository {

   @Autowired
   private JdbcTemplate jdbcTemplate;

   public void insertQuestion(Question question) {
      String sql = "INSERT INTO questions (question_id, title, explanation, question_duration, difficulty, question_point, solution, max_try, like_count, dislike_count, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      jdbcTemplate.update(sql, question.getQuestion_id(), question.getTitle(), question.getExplanation(),
            question.getQuestion_duration(), question.getDifficulty(), question.getQuestion_point(),
            question.getSolution(), question.getMax_try(), question.getLike_count(), question.getDislike_count(),
            question.getCreation_date());
   }

   public List<Question> findAll() {
      // return all questions as list
      String sql = "SELECT * FROM questions";
      return jdbcTemplate.query(sql, (resultSet, i) -> {
         Question question = new Question();
         question.setQuestion_id(resultSet.getString("question_id"));
         question.setTitle(resultSet.getString("title"));
         question.setExplanation(resultSet.getString("explanation"));
         question.setQuestion_duration(resultSet.getInt("question_duration"));
         question.setDifficulty(resultSet.getString("difficulty"));
         question.setQuestion_point(resultSet.getInt("question_point"));
         question.setSolution(resultSet.getString("solution"));
         question.setMax_try(resultSet.getInt("max_try"));
         question.setLike_count(resultSet.getInt("like_count"));
         question.setDislike_count(resultSet.getInt("dislike_count"));
         question.setCreation_date(resultSet.getDate("creation_date"));
         return question;
      });
   }

   public Question findById(String question_id) {

      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist");

      }

      String sql;
      if (question_id.substring(0, 2).equals("CQ")) {
         sql = "SELECT * FROM questions NATURAL JOIN coding_questions WHERE question_id = ?";
         return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            CodingQuestion question = new CodingQuestion();
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
            question.setVideo_link(rs.getString("video_link"));
            question.setRequest_count(rs.getInt("video_request_count"));
            return question;
         }, question_id);
      } else {
         sql = "SELECT * FROM questions NATURAL JOIN non_coding_questions WHERE question_id = ?";
         return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            NonCodingQuestion question = new NonCodingQuestion();
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
            question.setType_description(rs.getString("type_description"));
            return question;
         }, question_id);
      }

   }

   public void updateQuestion(String question_id, QuestionDto question) {
      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist");
      }
      String sql;
      if (question_id.substring(0, 2).equals("CQ")) {
         sql = "UPDATE questions NATURAL JOIN coding_questions SET title = ?, explanation = ?, question_duration = ?, difficulty = ?, question_point = ?, solution = ?, max_try = ?, like_count = ?, dislike_count = ?, creation_date = ?, video_link = ?, video_request_count = ? WHERE question_id = ?";
         jdbcTemplate.update(sql, question.getTitle(), question.getExplanation(), question.getQuestion_duration(),
               question.getDifficulty(), question.getQuestion_point(), question.getSolution(), question.getMax_try(),
               question.getLike_count(), question.getDislike_count(), question.getCreation_date(),
               question.getVideo_link(), question.getVideo_request_count(), question_id);

      } else {
         sql = "UPDATE questions NATURAL JOIN non_coding_questions SET title = ?, explanation = ?, question_duration = ?, difficulty = ?, question_point = ?, solution = ?, max_try = ?, like_count = ?, dislike_count = ?, creation_date = ?, type_description = ? WHERE question_id = ?";
         jdbcTemplate.update(sql, question.getTitle(), question.getExplanation(), question.getQuestion_duration(),
               question.getDifficulty(), question.getQuestion_point(), question.getSolution(), question.getMax_try(),
               question.getLike_count(), question.getDislike_count(), question.getCreation_date(),
               question.getType_description(), question_id);
      }
   }

   public void deleteQuestion(String question_id) {
      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "DELETE FROM questions WHERE question_id = ?";
      jdbcTemplate.update(sql, question_id);
   }

}
