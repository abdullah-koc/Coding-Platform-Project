package com.example.backend.controllers;

import com.example.backend.entities.Company;
import com.example.backend.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(path = "api/company")
public class CompanyController {
    @Autowired
    CompanyService companyService;

    @GetMapping("/{email}")
    public Company getCompanyByEmail(@PathVariable String email) {
        return companyService.getCompanyByEmail(email);
    }
}
