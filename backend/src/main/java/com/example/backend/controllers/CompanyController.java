package com.example.backend.controllers;

import com.example.backend.entities.Company;
import com.example.backend.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path = "api/company")
public class CompanyController {
    @Autowired
    CompanyService companyService;

    @GetMapping("/{email}")
    public Company getCompanyByEmail(@PathVariable String email) {
        return companyService.getCompanyByEmail(email);
    }

    @PostMapping("/change/photo/{company_id}/{photo}")
    public void changePhoto(@PathVariable String company_id, @PathVariable String photo){
        companyService.changePhoto(company_id, photo);
    }

    @PostMapping("/change/password/{company_id}/{password}")
    public void changePassword(@PathVariable String company_id, @PathVariable String password){
        companyService.changePassword(company_id, password);
    }

    @PostMapping("/change/phone/{company_id}/{phone}")
    public void changePhone(@PathVariable String company_id, @PathVariable String phone){
        companyService.changePhone(company_id, phone);
    }

    @PostMapping("/change/address/{company_id}/{address}")
    public void changeAddress(@PathVariable String company_id, @PathVariable String address){
        companyService.changeAddress(company_id, address);
    }

    @GetMapping("/all")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }
}
