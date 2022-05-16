package com.example.backend.repositories;

import java.util.List;

import com.example.backend.dto.CategoryDto;
import com.example.backend.dto.QuestionDto;

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
         last_question_id_sql = "SELECT question_id FROM questions WHERE question_id LIKE \"CQ%\" AND LENGTH(question_id) >= ALL(SELECT LENGTH(question_id) FROM questions WHERE question_id LIKE \"CQ%\") ORDER BY question_id DESC LIMIT 1";
      } else {
         last_question_id_sql = "SELECT question_id FROM questions WHERE question_id LIKE \"NCQ%\" AND LENGTH(question_id) >= ALL(SELECT LENGTH(question_id) FROM questions WHERE question_id LIKE \"NCQ%\") ORDER BY question_id DESC LIMIT 1";
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

      int is_contest;
      if (question.getIs_contest() == true) {
         is_contest = 1;
      } else {
         is_contest = 0;
      }

      String sql = "INSERT INTO questions (question_id, title, explanation, question_duration, difficulty, question_point, solution, max_try, like_count, dislike_count, editor_id, company_id, is_contest) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      jdbcTemplate.update(sql, question.getQuestion_id(), question.getTitle(), question.getExplanation(),
            question.getQuestion_duration(), question.getDifficulty(), question.getQuestion_point(),
            question.getSolution(), question.getMax_try(), question.getLike_count(), question.getDislike_count(),
            question.getEditor_id(), question.getCompany_id(), is_contest);

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
         question.setEditor_id(resultSet.getString("editor_id"));
         question.setCompany_id(resultSet.getString("company_id"));
         question.setIs_contest(resultSet.getBoolean("is_contest"));
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
            question.setCompany_id(rs.getString("company_id"));
            question.setEditor_id(rs.getString("editor_id"));
            question.setQuestion_point(rs.getInt("question_point"));
            question.setSolution(rs.getString("solution"));
            question.setMax_try(rs.getInt("max_try"));
            question.setLike_count(rs.getInt("like_count"));
            question.setDislike_count(rs.getInt("dislike_count"));
            question.setCreation_date(rs.getDate("creation_date"));
            question.setVideo_link(rs.getString("video_link"));
            question.setVideo_request_count(rs.getInt("video_request_count"));
            question.setIs_contest(rs.getBoolean("is_contest"));
            return question;
         }, question_id);
      } else {
         sql = "SELECT * FROM questions q JOIN non_coding_questions nq ON q.question_id = nq.non_coding_question_id WHERE question_id = ?";
         return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            QuestionDto question = new QuestionDto();
            question.setQuestion_id(rs.getString("question_id"));
            question.setCompany_id(rs.getString("company_id"));
            question.setEditor_id(rs.getString("editor_id"));
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
            question.setIs_contest(rs.getBoolean("is_contest"));
            return question;
         }, question_id);
      }

   }

   public void deleteQuestion(String question_id) {
      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "DELETE FROM questions WHERE question_id = ?";
      jdbcTemplate.update(sql, question_id);
   }

   public void addCategory(String question_id, String category_name) {
      if (question_id == null || category_name == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "INSERT INTO question_category (question_id, category_name) VALUES (?, ?)";
      jdbcTemplate.update(sql, question_id, category_name);
   }

   public void removeCategory(String question_id, String category_name) {
      if (question_id == null || category_name == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "DELETE FROM question_category WHERE question_id = ? AND category_name = ?";
      jdbcTemplate.update(sql, question_id, category_name);
   }

   public void userRequest(String question_id, String user_id) {
      if (question_id == null || user_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "INSERT INTO user_question (coding_question_id, user_id) VALUES (?, ?)";
      jdbcTemplate.update(sql, question_id, user_id);

      sql = "UPDATE coding_questions SET video_request_count = video_request_count + 1 WHERE coding_question_id = ?";
      jdbcTemplate.update(sql, question_id);
   }

   public void userCancelRequest(String question_id, String user_id) {
      if (question_id == null || user_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "DELETE FROM user_question WHERE coding_question_id = ? AND user_id = ?";
      jdbcTemplate.update(sql, question_id, user_id);

      sql = "UPDATE coding_questions SET video_request_count = video_request_count - 1 WHERE coding_question_id = ?";
      jdbcTemplate.update(sql, question_id);
   }

   public void editorRequest(String question_id, String video_link) {
      if (question_id == null || video_link == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE coding_questions SET video_link = ? WHERE coding_question_id = ?";
      jdbcTemplate.update(sql, video_link, question_id);

      sql = "UPDATE user_question SET is_resolved = 1 WHERE coding_question_id = ?";
      jdbcTemplate.update(sql, question_id);
   }

   public void updateTitle(String question_id, String title) {
      if (question_id == null || title == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE questions SET title = ? WHERE question_id = ?";
      jdbcTemplate.update(sql, title, question_id);
   }

   public void updateExplanation(String question_id, String explanation) {
      if (question_id == null || explanation == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE questions SET explanation = ? WHERE question_id = ?";
      jdbcTemplate.update(sql, explanation, question_id);
   }

   public void updateDuration(String question_id, int duration) {
      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE questions SET question_duration = ? WHERE question_id = ?";
      jdbcTemplate.update(sql, duration, question_id);
   }

   public void updateDifficulty(String question_id, String difficulty) {
      if (question_id == null || difficulty == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE questions SET difficulty = ? WHERE question_id = ?";
      jdbcTemplate.update(sql, difficulty, question_id);
   }

   public void updatePoint(String question_id, int point) {
      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE questions SET question_point = ? WHERE question_id = ?";
      jdbcTemplate.update(sql, point, question_id);
   }

   public void updateSolution(String question_id, String solution) {
      if (question_id == null || solution == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE questions SET solution = ? WHERE question_id = ?";
      jdbcTemplate.update(sql, solution, question_id);
   }

   public void updateMaxTry(String question_id, int max_try) {
      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE questions SET max_try = ? WHERE question_id = ?";
      jdbcTemplate.update(sql, max_try, question_id);
   }

   public void like(String question_id) {
      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE questions SET like_count = like_count + 1 WHERE question_id = ?";
      jdbcTemplate.update(sql, question_id);
   }

   public void dislike(String question_id) {
      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE questions SET dislike_count = dislike_count + 1 WHERE question_id = ?";
      jdbcTemplate.update(sql, question_id);
   }

   public void unlike(String question_id) {
      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE questions SET like_count = like_count - 1 WHERE question_id = ?";
      jdbcTemplate.update(sql, question_id);
   }

   public void undislike(String question_id) {
      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "UPDATE questions SET dislike_count = dislike_count - 1 WHERE question_id = ?";
      jdbcTemplate.update(sql, question_id);
   }

   public List<CategoryDto> getCategories(String question_id) {
      if (question_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "SELECT DISTINCT category_name FROM categories WHERE category_name IN (SELECT category_name FROM question_category WHERE question_id = ?)";
      return jdbcTemplate.query(sql, (resultSet, i) -> {
         CategoryDto category = new CategoryDto();
         category.setCategory_name(resultSet.getString("category_name"));
         return category;
      }, question_id);

   }

   public List<QuestionDto> getFilteredQuestions(String user_id, String category_name, String difficulty,
         String question_type,
         String is_solved, int min_point, int max_point, String search_keyword) {
      String sql = "SELECT * FROM questions WHERE question_point BETWEEN " + min_point + " AND " + max_point;
      if (!category_name.equals("all")) {
         sql += " AND question_id IN (SELECT question_id FROM question_category WHERE category_name = '" + category_name + "')";
      }
      if (!difficulty.equals("all")) {
         sql += " AND difficulty = '" + difficulty + "'";
      }
      if (!question_type.equals("all")) {
         sql += " AND question_id LIKE '" + question_type + "%" + "'";
      }
      if (!is_solved.equals("all")) {
         if (is_solved.equals("1")) {
            sql += " AND question_id IN (SELECT question_id FROM attempts WHERE user_id = '" + user_id + "')";
         } else if (is_solved.equals("0")) {
            sql += " AND question_id NOT IN (SELECT question_id FROM attempts WHERE user_id = '" + user_id + "')";
         }
      }
      if (!search_keyword.equals("all")) {
         sql += " AND title LIKE '%" + search_keyword + "%'";
      }
      
      return jdbcTemplate.query(sql, (rs, i) -> {
         QuestionDto question = new QuestionDto();
         question.setQuestion_id(rs.getString("question_id"));
         question.setTitle(rs.getString("title"));
         question.setExplanation(rs.getString("explanation"));
         question.setQuestion_duration(rs.getInt("question_duration"));
         question.setDifficulty(rs.getString("difficulty"));
         question.setCompany_id(rs.getString("company_id"));
         question.setEditor_id(rs.getString("editor_id"));
         question.setQuestion_point(rs.getInt("question_point"));
         question.setSolution(rs.getString("solution"));
         question.setMax_try(rs.getInt("max_try"));
         question.setLike_count(rs.getInt("like_count"));
         question.setDislike_count(rs.getInt("dislike_count"));
         question.setCreation_date(rs.getDate("creation_date"));
         question.setIs_contest(rs.getBoolean("is_contest"));
         return question;
      });

   }

   public boolean getIfUserSolved(String question_id, String user_id) {
      if (question_id == null || user_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "SELECT COUNT(*) AS cnt FROM attempts WHERE question_id = ? AND user_id = ?";
      int cnt = jdbcTemplate.queryForObject(sql, Integer.class, question_id, user_id);
      if (cnt > 0) {
         return true;
      } else {
         return false;
      }
   }

   public boolean getIfUserSolvedCorrectly(String question_id, String user_id) {
      if (question_id == null || user_id == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "SELECT COUNT(*) AS cnt FROM attempts WHERE question_id = ? AND user_id = ? AND is_solved = 1";
      int cnt = jdbcTemplate.queryForObject(sql, Integer.class, question_id, user_id);
      if (cnt > 0) {
         return true;
      } else {
         return false;
      }
   }

   public List<QuestionDto> searchQuestions(String search_keyword) {
      if (search_keyword == null) {
         throw new IllegalArgumentException("Question does not exist!");
      }
      String sql = "SELECT *, NULL as video_link, 0 as video_request_count FROM (questions q JOIN non_coding_questions ncq ON q.question_id = ncq.non_coding_question_id) WHERE title LIKE '%"
            + search_keyword
            + "%' UNION ALL (SELECT *, NULL as type_description FROM (questions q JOIN coding_questions cq ON q.question_id = cq.coding_question_id))";
      return jdbcTemplate.query(sql, (rs, i) -> {
         QuestionDto question = new QuestionDto();
         question.setQuestion_id(rs.getString("question_id"));
         question.setTitle(rs.getString("title"));
         question.setExplanation(rs.getString("explanation"));
         question.setQuestion_duration(rs.getInt("question_duration"));
         question.setDifficulty(rs.getString("difficulty"));
         question.setCompany_id(rs.getString("company_id"));
         question.setEditor_id(rs.getString("editor_id"));
         question.setQuestion_point(rs.getInt("question_point"));
         question.setSolution(rs.getString("solution"));
         question.setMax_try(rs.getInt("max_try"));
         question.setLike_count(rs.getInt("like_count"));
         question.setDislike_count(rs.getInt("dislike_count"));
         question.setCreation_date(rs.getDate("creation_date"));
         question.setType_description(rs.getString("type_description"));
         question.setVideo_link(rs.getString("video_link"));
         question.setIs_contest(rs.getBoolean("is_contest"));
         return question;
      });
   }

   public List<QuestionDto> getAvailableContestQuestions() {
      String sql = "SELECT * FROM questions WHERE is_contest = 1";
      return jdbcTemplate.query(sql, (rs, i) -> {
         QuestionDto question = new QuestionDto();
         question.setQuestion_id(rs.getString("question_id"));
         question.setTitle(rs.getString("title"));
         question.setExplanation(rs.getString("explanation"));
         question.setQuestion_duration(rs.getInt("question_duration"));
         question.setDifficulty(rs.getString("difficulty"));
         question.setCompany_id(rs.getString("company_id"));
         question.setEditor_id(rs.getString("editor_id"));
         question.setQuestion_point(rs.getInt("question_point"));
         question.setSolution(rs.getString("solution"));
         question.setMax_try(rs.getInt("max_try"));
         question.setLike_count(rs.getInt("like_count"));
         question.setDislike_count(rs.getInt("dislike_count"));
         question.setCreation_date(rs.getDate("creation_date"));
         question.setIs_contest(rs.getBoolean("is_contest"));
         return question;
      });
   }

}
