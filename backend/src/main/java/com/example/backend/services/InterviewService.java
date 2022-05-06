package com.example.backend.services;

import java.util.List;

import com.example.backend.dto.InterviewDto;
import com.example.backend.dto.QuestionDto;
import com.example.backend.dto.UserDto;
import com.example.backend.repositories.InterviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InterviewService {

   @Autowired
   InterviewRepository interviewRepository;

   public InterviewDto getInterview(String interview_id, String company_id) {
      return interviewRepository.getInterview(interview_id, company_id);
   }

   public List<InterviewDto> getAllInterviews() {
      return interviewRepository.getAllInterviews();
   }

   public List<InterviewDto> getAllInterviewsByCompany(String company_id) {
      return interviewRepository.getAllInterviewsByCompany(company_id);
   }

   public void createInterview(InterviewDto interviewDto) {
      interviewRepository.createInterview(interviewDto);
   }

   public void updateInterview(InterviewDto interviewDto) {
      interviewRepository.updateInterview(interviewDto);
   }

   public void deleteInterview(String interview_id, String company_id) {
      interviewRepository.deleteInterview(interview_id, company_id);
   }

   public List<QuestionDto> getQuestionsByCompany(String company_id) {
      return interviewRepository.getQuestionsByCompany(company_id);
   }

   public List<QuestionDto> getQuestions(String interview_id, String company_id) {
      return interviewRepository.getQuestions(interview_id, company_id);
   }

   public void addQuestion(String interview_id, String question_id, String company_id) {
      interviewRepository.addQuestion(interview_id, question_id, company_id);
   }

   public void removeQuestion(String interview_id, String question_id, String company_id) {
      interviewRepository.removeQuestion(interview_id, question_id, company_id);
   }

   public List<UserDto> getInterviewees(String company_id, String interview_id) {
      return interviewRepository.getInterviewees(company_id, interview_id);
   }

   public List<InterviewDto> getInterviewsByUser(String user_id) {
      return interviewRepository.getInterviewsByUser(user_id);
   }

}
