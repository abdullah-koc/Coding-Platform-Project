package com.example.backend.services;

import java.io.UnsupportedEncodingException;
import java.util.List;

import com.example.backend.dto.InterviewDto;
import com.example.backend.dto.QuestionDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entities.Interview;
import com.example.backend.entities.User;
import com.example.backend.repositories.InterviewRepository;

import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class InterviewService {

   @Autowired
   InterviewRepository interviewRepository;

   @Autowired
   UserRepository userRepository;

   @Autowired
   private JavaMailSender mailSender;

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

   public void addInterviewee(String interview_id, String nickname, String company_id) {
      interviewRepository.addInterviewee(interview_id, nickname, company_id);
   }

   public List<UserDto> seeResults(String interview_id) {
      return interviewRepository.seeResults(interview_id);
   }

   public List<UserDto> seePastResults(String interview_id, String user_id) {
      return interviewRepository.seePastResults(interview_id, user_id);
   }

   private void sendResultOfInterview(User user, Interview interview, boolean is_passed) throws MessagingException, UnsupportedEncodingException {
      String toAddress = user.getEmail();
      String fromAddress = "bingithelpdesk@gmail.com";
      String senderName = "Syncoder";
      String subject = "Interview Result";
      String content = "Dear [[name]],<br>"
              + "This is the result of your interview [[INTERVIEW]]: "
              + "[[RESULT]]<br>"
              + "Thank you,<br>"
              + "Syncoder.";

      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message);

      helper.setFrom(fromAddress, senderName);
      helper.setTo(toAddress);
      helper.setSubject(subject);

      content = content.replace("[[name]]", user.getFull_name());
      content = content.replace("[[INTERVIEW]]", interview.getInterview_name());

      if(is_passed)
         content = content.replace("[[RESULT]]", "You passed the interview. Congrats!");
      else
         content = content.replace("[[RESULT]]", "Unfortunately, you couldn't pass the interview. Don't worry, you can follow us for future opportunities");

      helper.setText(content, true);

      mailSender.send(message);
   }

   public void addResult(String interview_id, String user_id, boolean is_passed) throws MessagingException, UnsupportedEncodingException {
      User user = userRepository.findById(user_id);
      Interview interview = interviewRepository.findById(interview_id);
      sendResultOfInterview(user, interview, is_passed);
      interviewRepository.addResult(interview_id, user_id, is_passed);
   }

   public boolean getIfPassed(String interview_id, String user_id) {
      return interviewRepository.getIfPassed(interview_id, user_id);
   }

}
