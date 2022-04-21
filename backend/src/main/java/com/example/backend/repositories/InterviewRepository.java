package com.example.backend.repositories;

import java.util.List;

import com.example.backend.dto.InterviewDto;
import com.example.backend.dto.QuestionDto;
import com.example.backend.dto.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class InterviewRepository {

   @Autowired
   private JdbcTemplate jdbcTemplate;

   public InterviewDto getInterview(String interview_id, String company_id) {
      String sql = "SELECT * FROM interviews WHERE interview_id = ? AND company_id = ?";
      return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
         InterviewDto interviewDto = new InterviewDto();
         interviewDto.setInterview_id(rs.getString("interview_id"));
         interviewDto.setCompany_id(rs.getString("company_id"));
         interviewDto.setInterview_date(rs.getDate("interview_date"));
         interviewDto.setInterview_name(rs.getString("interview_name"));
         interviewDto.setInterview_duration(rs.getInt("interview_duration"));
         return interviewDto;
      }, interview_id, company_id);
   }

   public List<InterviewDto> getAllInterviews() {
      String sql = "SELECT * FROM interviews";
      return jdbcTemplate.query(sql, (rs, rowNum) -> {
         InterviewDto interviewDto = new InterviewDto();
         interviewDto.setInterview_id(rs.getString("interview_id"));
         interviewDto.setCompany_id(rs.getString("company_id"));
         interviewDto.setInterview_date(rs.getDate("interview_date"));
         interviewDto.setInterview_name(rs.getString("interview_name"));
         interviewDto.setInterview_duration(rs.getInt("interview_duration"));
         return interviewDto;
      });
   }

   public List<InterviewDto> getAllInterviewsByCompany(String company_id) {
      String sql = "SELECT * FROM interviews WHERE company_id = ?";
      return jdbcTemplate.query(sql, (rs, rowNum) -> {
         InterviewDto interviewDto = new InterviewDto();
         interviewDto.setInterview_id(rs.getString("interview_id"));
         interviewDto.setCompany_id(rs.getString("company_id"));
         interviewDto.setInterview_date(rs.getDate("interview_date"));
         interviewDto.setInterview_name(rs.getString("interview_name"));
         interviewDto.setInterview_duration(rs.getInt("interview_duration"));
         return interviewDto;
      }, company_id);
   }

   public void createInterview(InterviewDto interviewDto) {
      String sql = "INSERT INTO interviews (interview_id, company_id, interview_date, interview_name, interview_duration) VALUES (?, ?, ?, ?, ?)";
      jdbcTemplate.update(sql, interviewDto.getInterview_id(), interviewDto.getCompany_id(),
            interviewDto.getInterview_date(), interviewDto.getInterview_name(), interviewDto.getInterview_duration());
   }

   public void updateInterview(InterviewDto interviewDto) {
      String sql = "UPDATE interviews SET company_id = ?, interview_date = ?, interview_name = ?, interview_duration = ? WHERE interview_id = ?";
      jdbcTemplate.update(sql, interviewDto.getCompany_id(), interviewDto.getInterview_date(),
            interviewDto.getInterview_name(), interviewDto.getInterview_duration(), interviewDto.getInterview_id());
   }

   public void deleteInterview(String interview_id, String company_id) {
      String sql = "DELETE FROM interviews WHERE interview_id = ? AND company_id = ?";
      jdbcTemplate.update(sql, interview_id, company_id);
   }

   public void addQuestion(String interview_id, String question_id, String company_id) {
      String sql = "INSERT INTO interview_question (interview_id, question_id, company_id) VALUES (?, ?, ?)";
      jdbcTemplate.update(sql, interview_id, question_id, company_id);
   }

   public void removeQuestion(String interview_id, String question_id, String company_id) {
      String sql = "DELETE FROM interview_question WHERE interview_id = ? AND question_id = ? AND company_id = ?";
      jdbcTemplate.update(sql, interview_id, question_id, company_id);
   }

   public List<QuestionDto> getQuestions(String interview_id, String company_id) {
      String sql = "SELECT * FROM interview_question NATURAL JOIN questions WHERE interview_id = ? AND company_id = ?";
      return jdbcTemplate.query(sql, (rs, rowNum) -> {
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
         question.setCompany_id(rs.getString("company_id"));
         question.setEditor_id(rs.getString("editor_id"));
         return question;
      }, interview_id, company_id);
   }

   public List<QuestionDto> getQuestionsByCompany(String company_id) {
      String sql = "SELECT * FROM interview_question NATURAL JOIN questions WHERE company_id = ?";
      return jdbcTemplate.query(sql, (rs, rowNum) -> {
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
         question.setCompany_id(rs.getString("company_id"));
         question.setEditor_id(rs.getString("editor_id"));
         return question;
      }, company_id);
   }

   public List<UserDto> getInterviewees(String company_id, String interview_id) {
      String sql = "SELECT * FROM users NATURAL JOIN user_interview WHERE company_id = ? AND interview_id = ?";
      return jdbcTemplate.query(sql, (rs, rowNum) -> {
         UserDto userDto = new UserDto();
         userDto.setPerson_id(rs.getString("person_id"));
         userDto.setFull_name(rs.getString("full_name"));
         userDto.setEmail(rs.getString("email"));
         userDto.setNickname(rs.getString("nickname"));
         userDto.setPhone(rs.getString("phone"));
         userDto.setPhoto(rs.getString("photo"));
         userDto.setSchool(rs.getString("school"));
         userDto.setDepartment(rs.getString("department"));
         userDto.setCur_company(rs.getString("cur_company"));
         userDto.setSuccess_rate(rs.getString("success_rate"));
         userDto.setUser_point(rs.getString("user_point"));
         return userDto;
      }, company_id, interview_id);
   }

}
