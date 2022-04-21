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

    public Company signUp(Company company) {

        String last_company_id;
        int company_id_count;
        String last_company_id_sql = "SELECT company_id FROM companies ORDER BY company_id DESC LIMIT 1";
        try {
            last_company_id = (String) jdbcTemplate.queryForObject(last_company_id_sql, String.class);
            company_id_count = Integer.parseInt(last_company_id.substring(1));
            company_id_count++;
        } catch (EmptyResultDataAccessException e) {
            company_id_count = 0;
        }

        String companyId = "C" + company_id_count;
        company.setCompany_id(companyId);

        jdbcTemplate.update(
                "INSERT INTO companies (company_id, company_name, company_email, company_password, company_address, company_phone) VALUES (?, ?, ?, ?, ?, ?)",
                companyId, company.getCompany_name(), company.getCompany_email(), company.getCompany_password(), company.getCompany_address(), company.getCompany_phone());

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
