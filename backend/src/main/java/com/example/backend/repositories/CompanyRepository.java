package com.example.backend.repositories;

import com.example.backend.entities.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class CompanyRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Company signUp(Company company) {

        String last_company_id;
        int company_id_count;
        String last_company_id_sql = "SELECT company_id FROM companies WHERE LENGTH(company_id) >= ALL(SELECT LENGTH(company_id) FROM companies) ORDER BY company_id DESC LIMIT 1";
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

    public Company findCompanyById(String company_id) {
        String sql = "SELECT * FROM companies WHERE company_id = ?";
        try {
            return (Company) jdbcTemplate.queryForObject(sql, new Object[]{company_id}, new BeanPropertyRowMapper(Company.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public void updatePhoto(String company_id, String photo) {
        String sql = "UPDATE companies SET company_photo = ? WHERE company_id = ?";
        jdbcTemplate.update(sql, photo, company_id);
    }

    public void updatePassword(String company_id, String password) {
        String sql = "UPDATE companies SET company_password = ? WHERE company_id = ?";
        jdbcTemplate.update(sql, password, company_id);
    }

    public void updatePhone(String company_id, String phone) {
        String sql = "UPDATE companies SET company_phone = ? WHERE company_id = ?";
        jdbcTemplate.update(sql, phone, company_id);
    }

    public void updateAddress(String company_id, String address) {
        String sql = "UPDATE companies SET company_address = ? WHERE company_id = ?";
        jdbcTemplate.update(sql, address, company_id);
    }

    public void updateEmail(String company_id, String email){
        String sql = "UPDATE companies SET company_email = ? WHERE company_id = ?";
        jdbcTemplate.update(sql, email, company_id);
    }

    public void donate(String company_id, String contest_id, String money){
        String sql = "INSERT INTO company_contest(company_id, contest_id, money) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, company_id, contest_id, money);
    }

    public int getDonationAmount(String company_id, String contest_id){
        String sql  = "SELECT money FROM company_contest where company_id = ? and contest_id = ?";
        try{
            return jdbcTemplate.queryForObject(sql, new Object[]{company_id, contest_id}, Integer.class);
        } catch (EmptyResultDataAccessException e){
            return 0;
        }
    }


    public List<Company> getAllCompanies() {
        String sql = "SELECT * FROM companies";

        try {
            return jdbcTemplate.query(sql, new Object[]{},  new BeanPropertyRowMapper(Company.class));
        } catch(EmptyResultDataAccessException e) {
            return null;
        }
    }
}
