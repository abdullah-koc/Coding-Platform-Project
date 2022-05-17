package com.example.backend.entities;

import java.sql.Date;

public class Editor extends Person {
    private String experience_level;
    private int salary;
    private String cv;
    private String editor_id;

    private boolean is_approved;
    private String admin_id;

    public Editor() {
        super();
    }

    public Editor(String editor_id,
            String full_name,
            String email,
            String photo,
            String password,
            String nickname,
            String phone,
            boolean is_confirmed,
            Date reg_date,
            Date birth_date,
            String experience_level,
            int salary,
            String cv) {
        super(editor_id, full_name, email, photo, password, nickname, phone, is_confirmed, reg_date, birth_date);
        this.experience_level = experience_level;
        this.salary = salary;
        this.cv = cv;
    }

    public String getEditor_id() {
        return editor_id;
    }

    public void setEditor_id(String editor_id) {
        this.editor_id = editor_id;
    }

    public String getExperience_level() {
        return experience_level;
    }

    public void setExperience_level(String experience_level) {
        this.experience_level = experience_level;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public String getCv() {
        return cv;
    }

    public void setCv(String cv) {
        this.cv = cv;
    }

    public boolean isIs_approved() {
        return is_approved;
    }

    public void setIs_approved(boolean is_approved) {
        this.is_approved = is_approved;
    }

    public String getAdmin_id() {
        return admin_id;
    }

    public void setAdmin_id(String admin_id) {
        this.admin_id = admin_id;
    }
}
