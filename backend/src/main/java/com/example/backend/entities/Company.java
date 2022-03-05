package com.example.backend.entities;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Companies")
public class Company {
    private String company_name;
    private String company_email;
    private String password;
    private String company_phone;
    private String company_address;
    private String photo;
    private boolean is_approved;

    public Company() {
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public String getCompany_email() {
        return company_email;
    }

    public void setCompany_email(String company_email) {
        this.company_email = company_email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCompany_phone() {
        return company_phone;
    }

    public void setCompany_phone(String company_phone) {
        this.company_phone = company_phone;
    }

    public String getCompany_address() {
        return company_address;
    }

    public void setCompany_address(String company_address) {
        this.company_address = company_address;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public boolean isIs_approved() {
        return is_approved;
    }

    public void setIs_approved(boolean is_approved) {
        this.is_approved = is_approved;
    }
}
