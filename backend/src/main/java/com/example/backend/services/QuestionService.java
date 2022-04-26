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

   public void updateTitle(String question_id, String title) {
      questionRepository.updateTitle(question_id, title);
   }

   public void updateExplanation(String question_id, String explanation) {
      questionRepository.updateExplanation(question_id, explanation);
   }

   public void updateDuration(String question_id, int duration) {
      questionRepository.updateDuration(question_id, duration);
   }

   public void updateDifficulty(String question_id, String difficulty) {
      questionRepository.updateDifficulty(question_id, difficulty);
   }

   public void updatePoint(String question_id, int point) {
      questionRepository.updatePoint(question_id, point);
   }

   public void updateSolution(String question_id, String solution) {
      questionRepository.updateSolution(question_id, solution);
   }

   public void updateMaxTry(String question_id, int max_try) {
      questionRepository.updateMaxTry(question_id, max_try);
   }

   public void like(String question_id) {
      questionRepository.like(question_id);
   }

   public void dislike(String question_id) {
      questionRepository.dislike(question_id);
   }

   public void unlike(String question_id) {
      questionRepository.unlike(question_id);
   }

   public void undislike(String question_id) {
      questionRepository.undislike(question_id);
   }

}
