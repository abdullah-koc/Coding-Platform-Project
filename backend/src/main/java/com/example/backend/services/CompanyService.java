package com.example.backend.services;

import com.example.backend.dto.CompanyDto;
import com.example.backend.entities.Company;
import com.example.backend.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

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
        return companyRepository.findCompanyByEmail(email);
    }

    public boolean login(String email, String password) {
        Company company = companyRepository.findCompanyByEmail(email);
        if(company.getCompany_password().equals(password)) {
            return true;
        }
        return false;
    }

    public void changePhoto(String company_id, String photo){
        Company company = companyRepository.findCompanyById(company_id);
        company.setCompany_photo(photo);
        companyRepository.updatePhoto(company_id, photo);
    }

    public void changePassword(String company_id, String password){
        Company company = companyRepository.findCompanyById(company_id);
        company.setCompany_password(password);
        companyRepository.updatePassword(company_id,password);
    }

    public void changePhone(String company_id, String phone){
        Company company = companyRepository.findCompanyById(company_id);
        company.setCompany_phone(phone);
        companyRepository.updatePhone(company_id, phone);
    }

    public void changeAddress(String company_id, String address){
        Company company = companyRepository.findCompanyById(company_id);
        company.setCompany_address(address);
        companyRepository.updateAddress(company_id, address);
    }

    public void changeEmail(String company_id, String email){
        Company company = companyRepository.findCompanyById(company_id);
        company.setCompany_email(email);
        companyRepository.updateEmail(company_id, email);
    }

    public void donateContest(String company_id, String contest_id, String money){
        companyRepository.donate(company_id, contest_id, money);
    }

    public int getDonationAmount(String company_id, String contest_id){
        return companyRepository.getDonationAmount(company_id, contest_id);
    }

    public List<Company> getAllCompanies() {
        return companyRepository.getAllCompanies();
    }
}
