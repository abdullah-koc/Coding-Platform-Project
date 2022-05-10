package com.example.backend.controllers;

import com.example.backend.dto.EditorDto;
import com.example.backend.entities.Editor;
import com.example.backend.services.EditorService;
import com.example.backend.services.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/editor")
public class EditorController {
    @Autowired
    EditorService editorService;
    @Autowired
    private PhotoService photoService;

    @GetMapping("/verify")
    public String verifyEditor(@Param("code") String code) {
        if (editorService.verifyEditor(code)) {
            return "verify_success";
        } else {
            return "verify_fail";
        }
    }

    @GetMapping("/{email}")
    public Editor getEditorByEmail(@PathVariable String email) {
        return editorService.getEditorByEmail(email);
    }

    @PostMapping("/set/salary/{email}/{salary}")
    public void setSalary(@PathVariable String email, @PathVariable int salary){
        editorService.setSalary(email, salary);
    }

    @PostMapping("/set/experience/{email}/{experience_level}")
    public void setExperienceLevel(@PathVariable String email, @PathVariable String experience_level) {
        editorService.setExperienceLevel(email, experience_level);
    }

    @GetMapping("/all")
    public List<Editor> getAllEditors() {
        return editorService.getAllEditors();
    }

    @PostMapping("/change/photo/{nickname}")
    public ResponseEntity<Map> changePhoto(@PathVariable String nickname, @RequestParam MultipartFile multipartFile) throws IOException {
        Map result = photoService.uploadPhoto(multipartFile);
        editorService.changePhoto(nickname, (String) result.get("url"));
        return new ResponseEntity(result, HttpStatus.OK);
    }

}
