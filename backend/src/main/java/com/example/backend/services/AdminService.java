package com.example.backend.services;

import com.example.backend.entities.Admin;
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

    public void disapproveEditor(String admin_id, String editor_id) {
        adminRepository.disapproveEditor(admin_id, editor_id);
    }

    public void disapproveCompany(String admin_id, String company_id) {
        adminRepository.disapproveCompany(admin_id, company_id);
    }

    public Admin getAdminByEmail(String email) {
        return adminRepository.findAdminByEmail(email);
    }

    public boolean login(String email, String password) {
        Admin admin = adminRepository.findAdminByEmail(email);
        if(admin.getAdmin_password().equals(password)) {
            return true;
        }
        return false;
    }

}
