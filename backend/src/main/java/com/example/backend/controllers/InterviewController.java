package com.example.backend.controllers;

import java.util.List;

import com.example.backend.dto.InterviewDto;
import com.example.backend.dto.QuestionDto;
import com.example.backend.dto.UserDto;
import com.example.backend.services.InterviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/interview")
public class InterviewController {

   @Autowired
   private InterviewService interviewService;

   @GetMapping(path = "/{company_id}/{interview_id}")
   public InterviewDto getInterview(@PathVariable String interview_id, @PathVariable String company_id) {
      return interviewService.getInterview(interview_id, company_id);
   }

   @GetMapping(path = "/all")
   public List<InterviewDto> getAllInterviews() {
      return interviewService.getAllInterviews();
   }

   @GetMapping(path = "/all/{company_id}")
   public List<InterviewDto> getAllInterviewsByCompany(@PathVariable String company_id) {
      return interviewService.getAllInterviewsByCompany(company_id);
   }

   @PostMapping(path = "/create")
   public void createInterview(@RequestBody InterviewDto interviewDto) {
      interviewService.createInterview(interviewDto);
   }

   @PostMapping(path = "/update")
   public void updateInterview(@RequestBody InterviewDto interviewDto) {
      interviewService.updateInterview(interviewDto);
   }

   @PostMapping(path = "/delete/{interview_id}/{company_id}")
   public void deleteInterview(@PathVariable String interview_id, @PathVariable String company_id) {
      interviewService.deleteInterview(interview_id, company_id);
   }

   @PostMapping(path = "/add_question/{company_id}/{interview_id}/{question_id}")
   public void addQuestion(@PathVariable String interview_id, @PathVariable String question_id,
         @PathVariable String company_id) {
      interviewService.addQuestion(interview_id, question_id, company_id);
   }

   @PostMapping(path = "/remove_question/{company_id}/{interview_id}/{question_id}")
   public void removeQuestion(@PathVariable String interview_id, @PathVariable String question_id,
         @PathVariable String company_id) {
      interviewService.removeQuestion(interview_id, question_id, company_id);
   }

   @GetMapping(path = "/get_questions/{company_id}/{interview_id}")
   public List<QuestionDto> getQuestions(@PathVariable String interview_id, @PathVariable String company_id) {
      return interviewService.getQuestions(interview_id, company_id);
   }

   @GetMapping(path = "/get_questions_by_company/{company_id}")
   public List<QuestionDto> getQuestionsByCompany(@PathVariable String company_id) {
      return interviewService.getQuestionsByCompany(company_id);
   }

   @GetMapping(path = "/get_interviewees/{company_id}/{interview_id}")
   public List<UserDto> getInterviewees(@PathVariable String company_id, @PathVariable String interview_id) {
      return interviewService.getInterviewees(company_id, interview_id);
   }

   @GetMapping(path = "/get_interviews_by_user/{user_id}")
   public List<InterviewDto> getInterviewsByUser(@PathVariable String user_id) {
      return interviewService.getInterviewsByUser(user_id);
   }

   @PostMapping(path = "/add_interviewee/{company_id}/{interview_id}/{nickname}")
   public void addInterviewee(@PathVariable String interview_id, @PathVariable String nickname,
         @PathVariable String company_id) {
      interviewService.addInterviewee(interview_id, nickname, company_id);
   }
}
