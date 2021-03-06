package com.example.backend.services;

import java.util.List;

import com.example.backend.dto.CategoryDto;
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

   public void addCategory(String question_id, String category_name) {
      questionRepository.addCategory(question_id, category_name);
   }

   public void removeCategory(String question_id, String category_name) {
      questionRepository.removeCategory(question_id, category_name);
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

   public List<CategoryDto> getCategories(String question_id) {
      return questionRepository.getCategories(question_id);
   }

   public List<QuestionDto> getFilteredQuestions(String user_id, String category_name, String difficulty,
         String question_type,
         String is_solved, int min_point, int max_point, String search_keyword) {
      return questionRepository.getFilteredQuestions(user_id, category_name, difficulty, question_type, is_solved,
            min_point, max_point, search_keyword);
   }

   public boolean getIfUserSolved(String question_id, String user_id) {
      return questionRepository.getIfUserSolved(question_id, user_id);
   }

   public boolean getIfUserSolvedCorrectly(String question_id, String user_id) {
      return questionRepository.getIfUserSolvedCorrectly(question_id, user_id);
   }

   public List<QuestionDto> searchQuestions(String search_keyword) {
      return questionRepository.searchQuestions(search_keyword);
   }

   public List<QuestionDto> getAvailableContestQuestions() {
      return questionRepository.getAvailableContestQuestions();
   }

}
