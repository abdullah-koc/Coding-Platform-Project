package com.example.backend.entities;

public class User extends Person {
    private String school;
    private String department;
    private String cur_company;
    private String success_rate;
    private String user_point;

    public User() {
        super();
    }

    public User(int ID,
                String full_name,
                String email,
                String photo,
                String password,
                String nickname,
                String phone,
                boolean is_confirmed,
                String reg_date,
                String birth_date,
                String school,
                String department,
                String cur_company,
                String success_rate,
                String user_point) {
        super(ID, full_name, email, photo, password, nickname, phone, is_confirmed, reg_date, birth_date);
        this.school = school;
        this.department = department;
        this.cur_company = cur_company;
        this.success_rate = success_rate;
        this.user_point = user_point;
    }
}
