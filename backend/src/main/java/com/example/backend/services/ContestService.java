package com.example.backend.services;

import java.util.List;

import com.example.backend.entities.Question;
import com.example.backend.entities.Contest;
import com.example.backend.entities.User;
import com.example.backend.repositories.ContestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContestService {

   @Autowired
   ContestRepository contestRepository;

   public List<Contest> getAllContests() {
      return contestRepository.findAll();
   }

   public void insertContest(Contest contest) {
      contestRepository.insertContest(contest);
   }

   public void updateContest(String contest_id, Contest contest) {
      contestRepository.updateContest(contest_id, contest);
   }

   public void deleteContest(String contest_id) {
      contestRepository.deleteContest(contest_id);
   }

   public List<Contest> getAllContestsByPersonId(String person_id) {
      return contestRepository.getAllContestsByPersonId(person_id);
   }

   public List<Question> getAllQuestions(String contest_id) {
      return contestRepository.getAllQuestions(contest_id);
   }

   public List<User> getAllContestants(String contest_id) {
      return contestRepository.getAllContestants(contest_id);
   }

   public Contest getContestById(String contest_id) {
      return contestRepository.getContestById(contest_id);
   }

   public void insertQuestion(String contest_id, String question_id) {
      contestRepository.insertQuestion(contest_id, question_id);
   }

   public void insertContestant(String contest_id, String user_id) {
      contestRepository.insertContestant(contest_id, user_id);
   }

}
