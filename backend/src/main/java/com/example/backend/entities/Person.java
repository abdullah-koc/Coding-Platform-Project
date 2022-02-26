package com.example.backend.entities;

public class Person {
    private int ID;
    private String full_name;
    private String email;
    private String photo;
    private String password;
    private String nickname;
    private String phone;
    private boolean is_confirmed;
    private String reg_date;
    private String birth_date;

    public Person() {

    }

    public Person(int ID,
                  String full_name,
                  String email,
                  String photo,
                  String password,
                  String nickname,
                  String phone,
                  boolean is_confirmed,
                  String reg_date,
                  String birth_date) {
        this.ID = ID;
        this.full_name = full_name;
        this.email = email;
        this.photo = photo;
        this.password = password;
        this.nickname = nickname;
        this.phone = phone;
        this.is_confirmed = is_confirmed;
        this.reg_date = reg_date;
        this.birth_date = birth_date;
    }
}
