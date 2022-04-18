package com.example.backend.repositories;

import com.example.backend.entities.Editor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class EditorRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Editor signUp(Editor editor) {
        if (findByEmail(editor.getEmail()) != null) {
            throw new RuntimeException("Editor already exists");
        }
        jdbcTemplate.update(
                "INSERT INTO people (person_id, full_name, email, password, nickname, birth_date) VALUES ('E1', ?, ?, ?, ?, ?)",
                editor.getFull_name(), editor.getEmail(), editor.getPassword(), editor.getNickname(), editor.getBirth_date());

        jdbcTemplate.update(
                "UPDATE editors SET cv = " + editor.getCv_url() + " WHERE editor_id = " + editor.getEditor_id());

        return editor;
    }

    public Editor findByEmail(String email) {
        String sql = "SELECT e.* FROM editors e, people p WHERE p.person_id = e.editor_id AND email = ?";
        try {
            return (Editor) jdbcTemplate.queryForObject(sql, new Object[]{email}, new BeanPropertyRowMapper(Editor.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
