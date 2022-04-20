package com.example.backend.services;

import com.example.backend.dto.CompanyDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entities.Company;
import com.example.backend.entities.Person;
import com.example.backend.entities.User;
import com.example.backend.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    public void signUp(CompanyDto companyDto) {
        Company company = new Company();
        company.setCompany_name(companyDto.getCompany_name());
        company.setCompany_email(companyDto.getCompany_email());
        company.setCompany_password(companyDto.getCompany_password());
        company.setCompany_phone(companyDto.getCompany_phone());
        company.setCompany_address(companyDto.getCompany_address());
        companyRepository.signUp(company);
    }

    public Company getCompanyByEmail(String email) {
        return companyRepository.findByEmail(email);
    }

    public boolean login(String email, String password) {
        Company company = companyRepository.findByEmail(email);
        if(company.getCompany_password().equals(password)) {
            return true;
        }
        return false;
    }
}
