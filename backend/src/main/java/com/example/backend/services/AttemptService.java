package com.example.backend.services;

import com.example.backend.dto.AttemptDto;
import com.example.backend.entities.Attempt;
import com.example.backend.entities.TestCase;
import com.example.backend.repositories.AttemptRepository;
import com.example.backend.repositories.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttemptService {
    @Autowired
    AttemptRepository attemptRepository;

    @Autowired
    TestCaseRepository testCaseRepository;

    public void makeAttempt(AttemptDto attemptDto) {
        Attempt attempt = new Attempt();
        attempt.setUser_id(attemptDto.getUser_id());
        attempt.setQuestion_id(attemptDto.getQuestion_id());
        attempt.setUser_answer(attemptDto.getUser_answer());
        attempt.setProgramming_language(attemptDto.getProgramming_language());
        attemptRepository.insertAttempt(attempt);

        if(attempt.getQuestion_id().charAt(0) == 'C') {
            List<TestCase> testCases = testCaseRepository.findTestCases(attempt.getQuestion_id());
            for(int i = 0; i < testCases.size(); i++)
                attemptRepository.insertAttemptTestCase(attempt, testCases.get(i));

            attemptRepository.updateUserPoint(attempt);
        }
    }

    public List<Attempt> getUserOwnAttempts(String user_id, String question_id) {
        return attemptRepository.findUserOwnAttempts(user_id, question_id);
    }

    public List<Attempt> getAllAttemptsOnQuestion(String question_id) {
        return attemptRepository.findAllAttemptsOnQuestion(question_id);
    }

    public boolean is_solved_correctly(String user_id, String question_id) {
        return attemptRepository.is_solved_correctly(user_id, question_id);
    }

    public Attempt findAttemptByAttemptId(String attempt_id) {
        return attemptRepository.findAttemptByAttemptId(attempt_id);
    }
}
