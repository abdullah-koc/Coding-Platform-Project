package com.example.backend.services;

import com.example.backend.dto.EditorDto;
import com.example.backend.entities.Editor;
import com.example.backend.repositories.EditorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

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
        editor.setCv(editorDto.getCv());
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

    public void setSalary(String email, int salary){
        Editor editor = editorRepository.findByEmail(email);
        editor.setSalary(salary);
        editorRepository.updateSalary(editor.getEditor_id(), salary);
    }

    public void setExperienceLevel(String email, String experience_level) {
        Editor editor = editorRepository.findByEmail(email);
        editor.setExperience_level(experience_level);
        editorRepository.updateExperienceLevel(editor.getEditor_id(), experience_level);
    }

    public List<Editor> getAllEditors() {
        return editorRepository.getAllEditors();
    }
}
