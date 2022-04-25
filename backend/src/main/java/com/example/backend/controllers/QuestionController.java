package com.example.backend.controllers;

import java.util.List;

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

   @PostMapping("/update/{question_id}")
   public void updateQuestion(@PathVariable String question_id, @RequestBody QuestionDto question) {
      questionService.updateQuestion(question_id, question);
   }

   @GetMapping("/delete/{question_id}")
   public void deleteQuestion(@PathVariable String question_id) {
      questionService.deleteQuestion(question_id);
   }

   @GetMapping("/add_category/{question_id}/{category_id}")
   public void addCategory(@PathVariable String question_id, @PathVariable String category_id) {
      questionService.addCategory(question_id, category_id);
   }

   @GetMapping("/remove_category/{question_id}/{category_id}")
   public void removeCategory(@PathVariable String question_id, @PathVariable String category_id) {
      questionService.removeCategory(question_id, category_id);
   }

   @GetMapping("/user_request/{question_id}/{user_id}")
   public void userRequest(@PathVariable String question_id, @PathVariable String user_id) {
      questionService.userRequest(question_id, user_id);
   }

   @GetMapping("/user_cancel_request/{question_id}/{user_id}")
   public void userCancelRequest(@PathVariable String question_id, @PathVariable String user_id) {
      questionService.userCancelRequest(question_id, user_id);
   }

   @PostMapping("/editor_request/{question_id}")
   public void editorRequest(@PathVariable String question_id, @RequestBody String video_link) {
      questionService.editorRequest(question_id, video_link);
   }

}
