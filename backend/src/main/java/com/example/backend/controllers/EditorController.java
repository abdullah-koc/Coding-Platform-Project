package com.example.backend.controllers;

import com.example.backend.entities.Editor;
import com.example.backend.services.EditorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/editor")
public class EditorController {
    @Autowired
    EditorService editorService;

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

}
