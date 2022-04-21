package com.example.backend.repositories;

import com.example.backend.entities.Company;
import com.example.backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private int count = 0;

    public Company signUp(Company company) {

        String companyId = "C" + count;
        jdbcTemplate.update(
                "INSERT INTO companies (company_id, company_name, company_email, company_password, company_address, company_phone) VALUES (?, ?, ?, ?, ?, ?)",
                companyId, company.getCompany_name(), company.getCompany_email(), company.getCompany_password(), company.getCompany_address(), company.getCompany_phone());
        count++;
        return company;
    }

    public Company findCompanyByEmail(String email) {
        String sql = "SELECT * FROM companies WHERE company_email = ?";
        try {
            return (Company) jdbcTemplate.queryForObject(sql, new Object[]{email}, new BeanPropertyRowMapper(Company.class));
        } catch(EmptyResultDataAccessException e) {
            return null;
        }
    }
}
