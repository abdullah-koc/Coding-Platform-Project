package com.example.backend.repositories;

import com.example.backend.entities.Company;
import com.example.backend.entities.Editor;
import com.example.backend.entities.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class CompanyRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Company signUp(Company company) {
        if(findByEmail(company.getCompany_email()) != null ) {
            throw new RuntimeException("User already exists");
        }
        jdbcTemplate.update(
                "INSERT INTO companies (id, company_name, company_email, password, company_phone, company_address, is_approved) VALUES (10, ?, ?, ?, ?, ?, true)",
                company.getCompany_name(), company.getCompany_email(), company.getPassword(), company.getCompany_phone(), company.getCompany_address());
        return company;
    }

    /*public Company findByEmail(String email) {

        String sql = "SELECT * FROM companies c WHERE c.company_email = ?";
        ArrayList<Company> companies = jdbcTemplate.queryForObject(sql, new CompanyRowMapper(), new Object[]{email});

        if (companies.isEmpty()) {
            return new Company();
        } else if (companies.size() == 1) { // list contains exactly 1 element
            return companies.get(0);
        } else { // list contains more than 1 element
            // either return 1st element or throw an exception
        }
        return new Company();
    }*/


    public Optional<Company> findByEmail(String email) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM companies WHERE company_email = ?",
                    (rs, rowNum) -> Optional.of(mapUserResult(rs)), new Object[] { email });
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    private Company mapUserResult(final ResultSet rs) throws SQLException {
        //ArrayList<Company> companies = new ArrayList<Company>();
        Company company = new Company();
        company.setCompany_name(rs.getString("company_name"));
        company.setCompany_email(rs.getString("company_email"));
        company.setPassword(rs.getString("password"));
        company.setCompany_phone(rs.getString("company_phone"));
        company.setCompany_address(rs.getString("company_address"));

        return company;
    }
}

class CompanyRowMapper implements RowMapper<ArrayList<Company>> {

    @Override
    public ArrayList<Company> mapRow(ResultSet rs, int rowNum) throws SQLException {
        ArrayList<Company> companies = new ArrayList<Company>();
        Company company = new Company();
        company.setCompany_name(rs.getString("company_name"));
        company.setCompany_email(rs.getString("company_email"));
        company.setPassword(rs.getString("password"));
        company.setCompany_phone(rs.getString("company_phone"));
        company.setCompany_address(rs.getString("company_address"));
        companies.add(company);
        //company.setIs_approved(rs.getBoolean("is_approved"));
        //company.setIs_approved(true);
        //company.setPhoto(rs.getString("photo"));

        return companies;

    }
}
