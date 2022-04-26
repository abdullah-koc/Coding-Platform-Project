package com.example.backend.services;

import java.sql.Date;
import java.util.List;

import com.example.backend.dto.ContestDto;
import com.example.backend.dto.QuestionDto;
import com.example.backend.dto.UserDto;

import com.example.backend.repositories.ContestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContestService {

   @Autowired
   ContestRepository contestRepository;

   public List<ContestDto> getAllContests() {
      return contestRepository.findAll();
   }

   public void insertContest(ContestDto contest) {
      contestRepository.insertContest(contest);
   }

   public void deleteContest(String contest_id) {
      contestRepository.deleteContest(contest_id);
   }

   public List<ContestDto> getAllContestsByPersonId(String person_id) {
      return contestRepository.getAllContestsByPersonId(person_id);
   }

   public List<QuestionDto> getAllQuestions(String contest_id) {
      return contestRepository.getAllQuestions(contest_id);
   }

   public List<UserDto> getAllContestants(String contest_id) {
      return contestRepository.getAllContestants(contest_id);
   }

   public ContestDto getContestById(String contest_id) {
      return contestRepository.getContestById(contest_id);
   }

   public void insertQuestion(String contest_id, String question_id) {
      contestRepository.insertQuestion(contest_id, question_id);
   }

   public void insertContestant(String contest_id, String user_id) {
      contestRepository.insertContestant(contest_id, user_id);
   }

   public void deleteQuestion(String contest_id, String question_id) {
      contestRepository.deleteQuestion(contest_id, question_id);
   }

   public void deleteContestant(String contest_id, String user_id) {
      contestRepository.deleteContestant(contest_id, user_id);
   }

   public void updateContestName(String contest_id, String contest_name) {
      contestRepository.updateContestName(contest_id, contest_name);
   }

   public void updateContestPhoto(String contest_id, String contest_photo) {
      contestRepository.updateContestPhoto(contest_id, contest_photo);
   }

   public void updateContestStartDate(String contest_id, Date contest_start_date) {
      contestRepository.updateContestStartDate(contest_id, contest_start_date);
   }

   public void updateContestEndDate(String contest_id, Date contest_end_date) {
      contestRepository.updateContestEndDate(contest_id, contest_end_date);
   }

   public void updateContestPrize(String contest_id, String contest_prize) {
      contestRepository.updateContestPrize(contest_id, contest_prize);
   }

}
