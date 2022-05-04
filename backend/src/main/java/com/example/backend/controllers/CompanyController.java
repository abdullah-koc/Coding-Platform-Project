package com.example.backend.controllers;

import com.example.backend.entities.Company;
import com.example.backend.services.CompanyService;
import com.example.backend.services.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/company")
public class CompanyController {
    @Autowired
    CompanyService companyService;
    @Autowired
    private PhotoService photoService;

    @GetMapping("/{email}")
    public Company getCompanyByEmail(@PathVariable String email) {
        return companyService.getCompanyByEmail(email);
    }

    @PostMapping("/change/photo/{company_id}")
    public ResponseEntity<Map> changePhoto(@PathVariable String company_id, @RequestParam MultipartFile multipartFile) throws IOException {
        Map result = photoService.uploadPhoto(multipartFile);
        companyService.changePhoto(company_id, (String) result.get("url"));
        return new ResponseEntity(result, HttpStatus.OK);
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
