package com.example.backend.controllers;

import com.example.backend.entities.Editor;
import com.example.backend.services.EditorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/editor")
public class EditorController {
    @Autowired
    EditorService editorService;

    @GetMapping("/{email}")
    public Editor getEditorByEmail(@PathVariable String email) {
        return editorService.getEditorByEmail(email);
    }

}
