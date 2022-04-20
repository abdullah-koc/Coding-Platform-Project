package com.example.backend.services;

import com.example.backend.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepository;

    public void approveEditor(String admin_id, String editor_id) {
        adminRepository.approveEditor(admin_id, editor_id);
    }

    public void approveCompany(String admin_id, String company_id) {
        adminRepository.approveCompany(admin_id, company_id);
    }

}
