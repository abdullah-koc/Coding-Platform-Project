package com.example.backend.services;

import java.util.List;

import com.example.backend.dto.QuestionDto;
import com.example.backend.repositories.QuestionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

   @Autowired
   QuestionRepository questionRepository;

   public QuestionDto getQuestion(String question_id) {
      return questionRepository.findById(question_id);
   }

   public List<QuestionDto> getAllQuestions() {
      return questionRepository.findAll();
   }

   public void insertQuestion(QuestionDto question) {
      questionRepository.insertQuestion(question);
   }

   public void updateQuestion(String question_id, QuestionDto question) {
      questionRepository.updateQuestion(question_id, question);
   }

   public void deleteQuestion(String question_id) {
      questionRepository.deleteQuestion(question_id);
   }

   public void addCategory(String question_id, String category_id) {
      questionRepository.addCategory(question_id, category_id);
   }

   public void removeCategory(String question_id, String category_id) {
      questionRepository.removeCategory(question_id, category_id);
   }

   public void userRequest(String question_id, String user_id) {
      questionRepository.userRequest(question_id, user_id);
   }

   public void userCancelRequest(String question_id, String user_id) {
      questionRepository.userCancelRequest(question_id, user_id);
   }

   public void editorRequest(String question_id, String video_link) {
      questionRepository.editorRequest(question_id, video_link);
   }

}
