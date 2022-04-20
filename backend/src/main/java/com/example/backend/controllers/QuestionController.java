package com.example.backend.controllers;

import java.sql.Date;
import java.util.List;

import com.example.backend.dto.QuestionDto;
import com.example.backend.entities.Question;
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

   @RequestMapping("/get/{question_id}")
   public Question getQuestion(@PathVariable String question_id) {
      return questionService.getQuestion(question_id);
   }

   @RequestMapping("/get/all")
   public List<Question> getAllQuestions() {
      return questionService.getAllQuestions();
   }

   @PostMapping("/insert")
   public void insertQuestion(@RequestBody Question question) {
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
}
