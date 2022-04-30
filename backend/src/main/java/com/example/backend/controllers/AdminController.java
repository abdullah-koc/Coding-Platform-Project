package com.example.backend.controllers;

import com.example.backend.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.backend.entities.Admin;

@RestController
@RequestMapping(path = "api/admin")
public class AdminController {
    @Autowired
    AdminService adminService;

    @PutMapping("/approve/editor/{admin_id}/{editor_id}")
    public void approveEditor(@PathVariable String admin_id, @PathVariable String editor_id) {
        adminService.approveEditor(admin_id, editor_id);
    }

    @PutMapping("/approve/company/{admin_id}/{company_id}")
    public void approveCompany(@PathVariable String admin_id, @PathVariable String company_id) {
        adminService.approveCompany(admin_id, company_id);
    }
    
    @GetMapping("/{email}")
    public Admin getAdminByEmail(@PathVariable String email) {
        return adminService.getAdminByEmail(email);
    }
}
