package com.example.backend.controllers;

import com.example.backend.dto.AttemptDto;
import com.example.backend.entities.Attempt;
import com.example.backend.services.AttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/attempt")
public class AttemptController {

    @Autowired
    AttemptService attemptService;

    @PostMapping(path = "/make/attempt")
    public void makeAttempt(@RequestBody AttemptDto attemptDto) {
        attemptService.makeAttempt(attemptDto);
    }

    @GetMapping("/{user_id}")
    public List<Attempt> getUserOwnAttempts(@PathVariable String user_id, @RequestBody String question_id) {
        return attemptService.getUserOwnAttempts(user_id, question_id);
    }

    @GetMapping("/{question_id}/all")
    public List<Attempt> getAllAttemptsOnQuestion(@PathVariable String question_id) {
        return attemptService.getAllAttemptsOnQuestion(question_id);
    }

}
