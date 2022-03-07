package com.example.backend.services;

import com.example.backend.dto.CompanyDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entities.Company;
import com.example.backend.entities.User;
import com.example.backend.repositories.CompanyRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    public void signUp(CompanyDto companyDto) {
        Company company = new Company();
        company.setCompany_name(companyDto.getCompany_name());
        company.setCompany_email(companyDto.getCompany_email());
        company.setPassword(companyDto.getPassword());
        company.setCompany_phone(companyDto.getCompany_phone());
        company.setCompany_address(companyDto.getCompany_address());
        companyRepository.signUp(company);
    }

    public Optional<Company> getCompanyByEmail(String email) {
        return companyRepository.findByEmail(email);
    }
}
