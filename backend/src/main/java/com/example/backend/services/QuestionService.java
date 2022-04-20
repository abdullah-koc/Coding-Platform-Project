package com.example.backend.services;

import java.sql.Date;
import java.util.List;

import com.example.backend.dto.QuestionDto;
import com.example.backend.entities.Question;
import com.example.backend.repositories.QuestionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

   @Autowired
   QuestionRepository questionRepository;

   public Question getQuestion(String question_id) {
      return questionRepository.findById(question_id);
   }

   public List<Question> getAllQuestions() {
      return questionRepository.findAll();
   }

   public void insertQuestion(Question question) {
      questionRepository.insertQuestion(question);
   }

   public void updateQuestion(String question_id, QuestionDto question) {
      questionRepository.updateQuestion(question_id, question);
   }

   public void deleteQuestion(String question_id) {
      questionRepository.deleteQuestion(question_id);
   }

}
