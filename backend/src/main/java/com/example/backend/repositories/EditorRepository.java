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

    private int count = 0;

    public Editor signUp(Editor editor) {
        String editor_id = "E" + count;
        jdbcTemplate.update(
                "INSERT INTO people (person_id, full_name, email, password, nickname, birth_date) VALUES (?, ?, ?, ?, ?, ?)",
                editor_id, editor.getFull_name(), editor.getEmail(), editor.getPassword(), editor.getNickname(), editor.getBirth_date());

        String update_cv = "UPDATE editors SET cv = ? WHERE editor_id = ?";
        jdbcTemplate.update(update_cv, editor.getCv_url(), editor.getEditor_id());

        count++;
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

    public Editor findByNickname(String nickname) {
        String sql = "SELECT e.* FROM editors e, people p WHERE p.person_id = e.editor_id AND nickname = ?";
        try {
            return (Editor) jdbcTemplate.queryForObject(sql, new Object[]{nickname}, new BeanPropertyRowMapper(Editor.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
