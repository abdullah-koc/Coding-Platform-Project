package com.example.backend.repositories;

import com.example.backend.entities.Editor;
import com.example.backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class EditorRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
}
