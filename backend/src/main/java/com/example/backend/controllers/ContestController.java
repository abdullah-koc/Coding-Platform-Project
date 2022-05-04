package com.example.backend.controllers;

import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Map;

import com.example.backend.dto.ContestDto;
import com.example.backend.dto.QuestionDto;
import com.example.backend.dto.UserDto;
import com.example.backend.services.ContestService;

import com.example.backend.services.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "api/contest")
public class ContestController {

   @Autowired
   ContestService contestService;
   @Autowired
   private PhotoService photoService;

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

   @PostMapping(path = "/insert_question/{contest_id}/{question_id}")
   public void insertQuestion(@PathVariable String contest_id, @PathVariable String question_id) {
      contestService.insertQuestion(contest_id, question_id);
   }

   @PostMapping(path = "/insert_contestant/{contest_id}/{user_id}")
   public void insertContestant(@PathVariable String contest_id, @PathVariable String user_id) {
      contestService.insertContestant(contest_id, user_id);
   }

   @PostMapping(path = "/delete_question/{contest_id}/{question_id}")
   public void deleteQuestion(@PathVariable String contest_id, @PathVariable String question_id) {
      contestService.deleteQuestion(contest_id, question_id);
   }

   @PostMapping(path = "/delete_contestant/{contest_id}/{user_id}")
   public void deleteContestant(@PathVariable String contest_id, @PathVariable String user_id) {
      contestService.deleteContestant(contest_id, user_id);
   }

   @PostMapping(path = "/update_contest_name/{contest_id}")
   public void updateContestName(@PathVariable String contest_id, @RequestBody String contest_name) {
      contestService.updateContestName(contest_id, contest_name);
   }

   @PostMapping("/change/photo/{contest_id}")
   public ResponseEntity<Map> changePhoto(@PathVariable String contest_id, @RequestParam MultipartFile multipartFile) throws IOException {
      Map result = photoService.uploadPhoto(multipartFile);
      contestService.changePhoto(contest_id, (String) result.get("url"));
      return new ResponseEntity(result, HttpStatus.OK);
   }

   @PostMapping(path = "/update_contest_start_date/{contest_id}")
   public void updateContestStartDate(@PathVariable String contest_id, @RequestBody Date contest_start_date) {
      contestService.updateContestStartDate(contest_id, contest_start_date);
   }

   @PostMapping(path = "/update_contest_end_date/{contest_id}")
   public void updateContestEndDate(@PathVariable String contest_id, @RequestBody Date contest_end_date) {
      contestService.updateContestEndDate(contest_id, contest_end_date);
   }

   @PostMapping(path = "/update_contest_prize/{contest_id}")
   public void updateContestPrize(@PathVariable String contest_id, @RequestBody String contest_prize) {
      contestService.updateContestPrize(contest_id, contest_prize);
   }

}
