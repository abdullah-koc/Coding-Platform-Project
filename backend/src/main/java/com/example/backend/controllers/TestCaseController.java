package com.example.backend.controllers;

import com.example.backend.dto.AttemptTestCaseDto;
import com.example.backend.dto.TestCaseDto;
import com.example.backend.entities.TestCase;
import com.example.backend.services.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/testcase")
public class TestCaseController {

    @Autowired
    TestCaseService testCaseService;

    @PostMapping(path = "/add")
    public void addTestCase(@RequestBody TestCaseDto testCaseDto) {
        testCaseService.addTestCase(testCaseDto);
    }

    @GetMapping("/{coding_question_id}/testCases")
    public List<TestCase> getAllTestCasesOnCodingQuestion(@PathVariable String coding_question_id) {
        return testCaseService.getAllTestCasesOnCodingQuestion(coding_question_id);
    }

    @GetMapping("/get/matches/{question_id}/{user_id}/{attempt_id}")
    public List<AttemptTestCaseDto> getAllAttemptTestCaseMatches(@PathVariable String question_id, @PathVariable String user_id, @PathVariable String attempt_id) {
        return testCaseService.getAllAttemptTestCaseMatches(question_id, user_id, attempt_id);
    }

    @GetMapping("/get/{coding_question_id}/{test_case_id}")
    public TestCase findTestCaseById(@PathVariable String coding_question_id, @PathVariable String test_case_id) {
        return testCaseService.findTestCaseById(coding_question_id, test_case_id);
    }
}
