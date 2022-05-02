package com.example.backend.repositories;

import com.example.backend.entities.Editor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class EditorRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Editor signUp(Editor editor) {
        String last_editor_id;
        int editor_id_count;
        String last_editor_id_sql = "SELECT editor_id FROM editors WHERE LENGTH(editor_id) >= ALL(SELECT LENGTH(editor_id) FROM editors) ORDER BY editor_id DESC LIMIT 1";
        try {
            last_editor_id = (String) jdbcTemplate.queryForObject(last_editor_id_sql, String.class);
            editor_id_count = Integer.parseInt(last_editor_id.substring(1));
            editor_id_count++;
        } catch (EmptyResultDataAccessException e) {
            editor_id_count = 0;
        }

        String editor_id = "E" + editor_id_count;
        editor.setEditor_id(editor_id);
        jdbcTemplate.update(
                "INSERT INTO people (person_id, full_name, email, password, nickname, birth_date) VALUES (?, ?, ?, ?, ?, ?)",
                editor_id, editor.getFull_name(), editor.getEmail(), editor.getPassword(), editor.getNickname(), editor.getBirth_date());

        String update_cv = "UPDATE editors SET cv = ? WHERE editor_id = ?";
        jdbcTemplate.update(update_cv, editor.getCv(), editor.getEditor_id());

        return editor;
    }

    public Editor findByEmail(String email) {
        String sql = "SELECT * FROM editors e, people p WHERE p.person_id = e.editor_id AND email = ?";
        try {
            return (Editor) jdbcTemplate.queryForObject(sql, new Object[]{email}, new BeanPropertyRowMapper(Editor.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Editor findByNickname(String nickname) {
        String sql = "SELECT * FROM editors e, people p WHERE p.person_id = e.editor_id AND nickname = ?";
        try {
            return (Editor) jdbcTemplate.queryForObject(sql, new Object[]{nickname}, new BeanPropertyRowMapper(Editor.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public void updateSalary(String editor_id, int salary) {
        String sql = "UPDATE editors SET salary = ? WHERE editor_id = ?";
        jdbcTemplate.update(sql, salary, editor_id);
    }

    public void updateExperienceLevel(String editor_id, String experience_level) {
        String sql = "UPDATE editors SET experience_level = ? WHERE editor_id = ?";
        jdbcTemplate.update(sql, experience_level, editor_id);
    }

    public List<Editor> getAllEditors() {
        String sql = "SELECT * FROM editors e, people p WHERE p.person_id = e.editor_id";

        try {
            return jdbcTemplate.query(sql, new Object[]{},  new BeanPropertyRowMapper(Editor.class));
        } catch(EmptyResultDataAccessException e) {
            return null;
        }
    }
}
