package com.example.backend.repositories;

import java.util.List;

import com.example.backend.dto.QuestionDto;
import com.example.backend.entities.CodingQuestion;
import com.example.backend.entities.NonCodingQuestion;
import com.example.backend.entities.Question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class QuestionRepository {

   @Autowired
   private JdbcTemplate jdbcTemplate;

   public void insertQuestion(QuestionDto question) {

      String last_question_id;
      int question_id_count;
      String last_question_id_sql;
      if (question.getQuestion_type().equals("CQ")) {
         last_question_id_sql = "SELECT question_id FROM questions WHERE question_id LIKE \"CQ%\" ORDER BY question_id DESC LIMIT 1";
      } else {
         last_question_id_sql = "SELECT question_id FROM questions WHERE question_id LIKE \"NCQ%\" ORDER BY question_id DESC LIMIT 1";
      }
      try {
         last_question_id = (String) jdbcTemplate.queryForObject(last_question_id_sql, String.class);

         if (question.getQuestion_type().equals("CQ")) {
            if (!last_question_id.substring(2).equals("")) {
               question_id_count = Integer.parseInt(last_question_id.substring(2));
            } else {
               question_id_count = 0;
            }
         } else {
            if (!last_question_id.substring(3).equals("")) {
               question_id_count = Integer.parseInt(last_question_id.substring(3));
            } else {
               question_id_count = 0;
            }
         }

         question_id_count++;
      } catch (EmptyResultDataAccessException e) {
         question_id_count = 0;
      }

      if (question.getQuestion_type().equals("CQ")) {
         question.setQuestion_id("CQ" + question_id_count);
      } else {
         question.setQuestion_id("NCQ" + question_id_count);
      }

      String sql = "INSERT INTO questions (question_id, title, explanation, question_duration, difficulty, question_point, solution, max_try, like_count, dislike_count, creation_date, editor_id, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      jdbcTemplate.update(sql, question.getQuestion_id(), question.getTitle(), question.getExplanation(),
            question.getQuestion_duration(), question.getDifficulty(), question.getQuestion_point(),
            question.getSolution(), question.getMax_try(), question.getLike_count(), question.getDislike_count(),
            question.getCreation_date(), question.getEditor_id(), question.getCompany_id());

      if (question.getQuestion_id().substring(0, 2).equals("NQ")) {
         // update type description if exists
         if (question.getType_description() != null) {
            String sql2 = "UPDATE questions SET type_description = ? WHERE question_id = ?";
            jdbcTemplate.update(sql2, question.getType_description(), question.getQuestion_id());
         }
      }
   }

   public List<QuestionDto> findAll() {
      // return all questions as list
      String sql = "SELECT *, NULL as video_link, 0 as video_request_count FROM (questions q JOIN non_coding_questions ncq ON q.question_id = ncq.non_coding_question_id) UNION ALL (SELECT *, NULL as type_description FROM (questions q JOIN coding_questions cq ON q.question_id = cq.coding_question_id))";
      return jdbcTemplate.query(sql, (resultSet, i) -> {
         QuestionDto question = new QuestionDto();
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
         question.setType_description(resultSet.getString("type_description"));
         question.setVideo_link(resultSet.getString("video_link"));
         return question;
      });
   }

   public QuestionDto findById(String question_id) {

      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist");

      }

      String sql;
      if (question_id.substring(0, 2).equals("CQ")) {
         sql = "SELECT * FROM questions q JOIN coding_questions cq ON q.question_id = cq.coding_question_id WHERE question_id = ?";
         return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            QuestionDto question = new QuestionDto();
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
            question.setVideo_request_count(rs.getInt("video_request_count"));
            return question;
         }, question_id);
      } else {
         sql = "SELECT * FROM questions q JOIN non_coding_questions nq ON q.question_id = nq.non_coding_question_id WHERE question_id = ?";
         return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            QuestionDto question = new QuestionDto();
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
