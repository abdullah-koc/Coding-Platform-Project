package com.example.backend.services;

import com.example.backend.dto.AttemptDto;
import com.example.backend.entities.Attempt;
import com.example.backend.repositories.AttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttemptService {
    @Autowired
    AttemptRepository attemptRepository;

    public void makeAttempt(AttemptDto attemptDto) {
        Attempt attempt = new Attempt();
        attempt.setUser_id(attemptDto.getUser_id());
        attempt.setQuestion_id(attemptDto.getQuestion_id());
        attempt.setUser_answer(attemptDto.getUser_answer());
        attempt.setProgramming_language(attemptDto.getProgramming_language());
        attemptRepository.insertAttempt(attempt);
    }

    public List<Attempt> getUserOwnAttempts(String user_id, String question_id) {
        return attemptRepository.findUserOwnAttempts(user_id, question_id);
    }

    public List<Attempt> getAllAttemptsOnQuestion(String question_id) {
        return attemptRepository.findAllAttemptsOnQuestion(question_id);
    }
}
