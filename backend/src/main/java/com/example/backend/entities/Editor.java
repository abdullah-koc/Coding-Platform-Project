package com.example.backend.entities;

public class Editor extends Person {
    private String experience_level;
    private int salary;
    private String cv_url;
    private String editor_id;

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
                  String reg_date,
                  String birth_date,
                  String experience_level,
                  int salary,
                  String cv_url) {
        super(editor_id, full_name, email, photo, password, nickname, phone, is_confirmed, reg_date, birth_date);
        this.editor_id = editor_id;
        this.experience_level = experience_level;
        this.salary = salary;
        this.cv_url = cv_url;
    }

    public String getEditor_id() {
        return editor_id;
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

    public String getCv_url() { return cv_url;}

    public void setCv_url(String cv_url) {
        this.cv_url = cv_url;
    }
}
