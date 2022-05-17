package com.example.backend.services;

import com.example.backend.dto.AttemptTestCaseDto;
import com.example.backend.dto.TestCaseDto;
import com.example.backend.entities.TestCase;
import com.example.backend.repositories.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TestCaseService {

    @Autowired
    TestCaseRepository testCaseRepository;

    public void addTestCase(TestCaseDto testCaseDto) {

        TestCase testCase = new TestCase();
        testCase.setExample_input(testCaseDto.getExample_input());
        testCase.setExample_output(testCaseDto.getExample_output());
        testCase.setIs_locked(testCaseDto.isIs_locked());
        testCase.setCoding_question_id(testCaseDto.getCoding_question_id());

        testCaseRepository.insertTestCase(testCase);
    }

    public List<TestCase> getAllTestCasesOnCodingQuestion(String coding_question_id) {
        return testCaseRepository.findTestCases(coding_question_id);
    }

    public List<AttemptTestCaseDto> getAllAttemptTestCaseMatches(String question_id, String user_id, String attempt_id) {
        return testCaseRepository.getAllAttemptTestCaseMatches(question_id, user_id, attempt_id);
    }

    public TestCase findTestCaseById(String coding_question_id, String test_case_id) {
        return testCaseRepository.findTestCaseById(coding_question_id, test_case_id);
    }

}
