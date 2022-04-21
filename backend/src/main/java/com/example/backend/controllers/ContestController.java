package com.example.backend.controllers;

import java.util.List;

import javax.persistence.PostPersist;

import com.example.backend.dto.ContestDto;
import com.example.backend.dto.QuestionDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entities.Contest;
import com.example.backend.entities.Question;
import com.example.backend.entities.User;
import com.example.backend.services.ContestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/contest")
public class ContestController {

   @Autowired
   ContestService contestService;

   @GetMapping(path = "/{contest_id}")
   public ContestDto getContestById(@PathVariable String contest_id) {
      return contestService.getContestById(contest_id);
   }

   @GetMapping(path = "/all")
   public List<ContestDto> getAllContests() {
      return contestService.getAllContests();
   }

   @PostMapping(path = "/insert")
   public void insertContest(@RequestBody ContestDto contest) {
      contestService.insertContest(contest);
   }

   @PostMapping(path = "/update/{contest_id}")
   public void updateContest(@PathVariable String contest_id, @RequestBody ContestDto contest) {
      contestService.updateContest(contest_id, contest);
   }

   @PostMapping(path = "/delete/{contest_id}")
   public void deleteContest(@PathVariable String contest_id) {
      contestService.deleteContest(contest_id);
   }

   @GetMapping(path = "/get/all/{person_id}")
   public List<ContestDto> getAllContestsByPersonId(@PathVariable String person_id) {
      return contestService.getAllContestsByPersonId(person_id);
   }

   @GetMapping(path = "/all_contestants/{contest_id}")
   public List<UserDto> getAllContestants(@PathVariable String contest_id) {
      return contestService.getAllContestants(contest_id);
   }

   @GetMapping(path = "/all_questions/{contest_id}")
   public List<QuestionDto> getAllQuestions(@PathVariable String contest_id) {
      return contestService.getAllQuestions(contest_id);
   }

   @GetMapping(path = "/insert_question/{contest_id}/{question_id}")
   public void insertQuestion(@PathVariable String contest_id, @PathVariable String question_id) {
      contestService.insertQuestion(contest_id, question_id);
   }

   @GetMapping(path = "/insert_contestant/{contest_id}/{person_id}")
   public void insertContestant(@PathVariable String contest_id, @PathVariable String user_id) {
      contestService.insertContestant(contest_id, user_id);
   }

}
