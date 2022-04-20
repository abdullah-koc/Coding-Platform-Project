package com.example.backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AdminRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void approveEditor(String admin_id, String editor_id) {
        String update_is_approved = "UPDATE editors SET is_approved = ? WHERE editor_id = ?";
        jdbcTemplate.update(update_is_approved, true, editor_id);

        String update_admin_id = "UPDATE editors SET admin_id = ? WHERE editor_id = ?";
        jdbcTemplate.update(update_admin_id, admin_id, editor_id);
    }

    public void approveCompany(String admin_id, String company_id) {
        String update_is_approved = "UPDATE companies SET is_approved = ? WHERE company_id = ?";
        jdbcTemplate.update(update_is_approved, true, company_id);

        String update_admin_id = "UPDATE companies SET admin_id = ? WHERE company_id = ?";
        jdbcTemplate.update(update_admin_id, admin_id, company_id);

    }
}
