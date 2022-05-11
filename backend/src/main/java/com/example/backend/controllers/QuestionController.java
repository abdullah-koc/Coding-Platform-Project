package com.example.backend.controllers;

import java.util.List;

import com.example.backend.dto.CategoryDto;
import com.example.backend.dto.QuestionDto;
import com.example.backend.services.QuestionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/question")
public class QuestionController {

   @Autowired
   QuestionService questionService;

   @RequestMapping("/{question_id}")
   public QuestionDto getQuestion(@PathVariable String question_id) {
      return questionService.getQuestion(question_id);
   }

   @RequestMapping("/all")
   public List<QuestionDto> getAllQuestions() {
      return questionService.getAllQuestions();
   }

   @PostMapping("/insert")
   public void insertQuestion(@RequestBody QuestionDto question) {
      questionService.insertQuestion(question);
   }

   @PostMapping("/delete/{question_id}")
   public void deleteQuestion(@PathVariable String question_id) {
      questionService.deleteQuestion(question_id);
   }

   @PostMapping("/add_category/{question_id}/{category_name}")
   public void addCategory(@PathVariable String question_id, @PathVariable String category_name) {
      questionService.addCategory(question_id, category_name);
   }

   @PostMapping("/remove_category/{question_id}/{category_name}")
   public void removeCategory(@PathVariable String question_id, @PathVariable String category_name) {
      questionService.removeCategory(question_id, category_name);
   }

   @GetMapping("/get_categories/{question_id}")
   public List<CategoryDto> getCategories(@PathVariable String question_id) {
      return questionService.getCategories(question_id);
   }

   @PostMapping("/user_request/{question_id}/{user_id}")
   public void userRequest(@PathVariable String question_id, @PathVariable String user_id) {
      questionService.userRequest(question_id, user_id);
   }

   @PostMapping("/user_cancel_request/{question_id}/{user_id}")
   public void userCancelRequest(@PathVariable String question_id, @PathVariable String user_id) {
      questionService.userCancelRequest(question_id, user_id);
   }

   @PostMapping("/editor_request/{question_id}")
   public void editorRequest(@PathVariable String question_id, @RequestBody String video_link) {
      questionService.editorRequest(question_id, video_link);
   }

   @PostMapping("/update_title/{question_id}")
   public void updateTitle(@PathVariable String question_id, @RequestBody String title) {
      questionService.updateTitle(question_id, title);
   }

   @PostMapping("/update_explanation/{question_id}")
   public void updateExplanation(@PathVariable String question_id, @RequestBody String explanation) {
      questionService.updateExplanation(question_id, explanation);
   }

   @PostMapping("/update_duration/{question_id}")
   public void updateDuration(@PathVariable String question_id, @RequestBody int duration) {
      questionService.updateDuration(question_id, duration);
   }

   @PostMapping("/update_difficulty/{question_id}")
   public void updateDifficulty(@PathVariable String question_id, @RequestBody String difficulty) {
      questionService.updateDifficulty(question_id, difficulty);
   }

   @PostMapping("/update_point/{question_id}")
   public void updatePoint(@PathVariable String question_id, @RequestBody int point) {
      questionService.updatePoint(question_id, point);
   }

   @PostMapping("/update_solution/{question_id}")
   public void updateSolution(@PathVariable String question_id, @RequestBody String solution) {
      questionService.updateSolution(question_id, solution);
   }

   @PostMapping("/update_max_try/{question_id}")
   public void updateMaxTry(@PathVariable String question_id, @RequestBody int max_try) {
      questionService.updateMaxTry(question_id, max_try);
   }

   @GetMapping("like/{question_id}")
   public void like(@PathVariable String question_id) {
      questionService.like(question_id);
   }

   @GetMapping("dislike/{question_id}")
   public void dislike(@PathVariable String question_id) {
      questionService.dislike(question_id);
   }

   @GetMapping("/unlike/{question_id}")
   public void unlike(@PathVariable String question_id) {
      questionService.unlike(question_id);
   }

   @GetMapping("/undislike/{question_id}")
   public void undislike(@PathVariable String question_id) {
      questionService.undislike(question_id);
   }

   @GetMapping("/get_filtered_questions/{user_id}/{category_name}/{difficulty}/{question_type}/{is_solved}/{search_keyword}")
   public List<QuestionDto> getFilteredQuestions(@PathVariable String user_id, @PathVariable String category_name,
         @PathVariable String difficulty, @PathVariable String question_type, @PathVariable String is_solved,
         @PathVariable String search_keyword) {
      return questionService.getFilteredQuestions(user_id, category_name, difficulty, question_type, is_solved,
            search_keyword);
   }

   @GetMapping("/get_if_user_solved/{question_id}/{user_id}")
   public boolean getIfUserSolved(@PathVariable String question_id, @PathVariable String user_id) {
      return questionService.getIfUserSolved(question_id, user_id);
   }

   @GetMapping("/get_if_user_solved_correctly/{question_id}/{user_id}")
   public boolean getIfUserSolvedCorrectly(@PathVariable String question_id, @PathVariable String user_id) {
      return questionService.getIfUserSolvedCorrectly(question_id, user_id);
   }

   @GetMapping("/search_questions/{search_keyword}")
   public List<QuestionDto> searchQuestions(@PathVariable String search_keyword) {
      return questionService.searchQuestions(search_keyword);
   }

}
