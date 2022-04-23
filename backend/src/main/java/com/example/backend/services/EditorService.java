package com.example.backend.services;

import com.example.backend.dto.EditorDto;
import com.example.backend.entities.Editor;
import com.example.backend.repositories.EditorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EditorService {

    @Autowired
    private EditorRepository editorRepository;

    public void signUp(EditorDto editorDto) {

        Editor editor = new Editor();
        editor.setFull_name(editorDto.getFull_name());
        editor.setEmail(editorDto.getEmail());
        editor.setBirth_date(editorDto.getBirth_date());
        editor.setNickname(editorDto.getNickname());
        editor.setPassword(editorDto.getPassword());
        editorRepository.signUp(editor);
    }

    public Editor getEditorByEmail(String email) {
        return editorRepository.findByEmail(email);
    }

    public boolean loginEditor(String email, String password) {
       Editor editor = editorRepository.findByEmail(email);
        if(editor.getPassword().equals(password) && editor.isIs_approved() && editor.getIs_confirmed()) {
            return true;
        }
        return false;
    }

}
