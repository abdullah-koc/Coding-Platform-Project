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

    @PostMapping("/change/email/{company_id}/{email}")
    public void changeEmail(@PathVariable String company_id, @PathVariable String email){
        companyService.changeEmail(company_id, email);
    }

    @PostMapping("/donate/{company_id}/{contest_id}/{money}")
    public void donateContest(@PathVariable String company_id, @PathVariable String contest_id, @PathVariable String money){
        companyService.donateContest(company_id, contest_id, money);
    }

    @GetMapping("/get/donation/{company_id}/{contest_id}")
    public int getDonationAmount(@PathVariable String company_id, @PathVariable String contest_id){
        return companyService.getDonationAmount(company_id, contest_id);
    }

    @GetMapping("/all")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }
}
