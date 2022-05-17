package com.example.backend.entities;

import java.sql.Date;

public class Person {


    private String person_id;
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

    public Person(String person_id,
                  String full_name,
                  String email,
                  String photo,
                  String password,
                  String nickname,
                  String phone,
                  boolean is_confirmed,
                  String reg_date,
                  String birth_date) {
        this.person_id = person_id;
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

    public String getPerson_id() {
        return person_id;
    }

    public void setPerson_id(String person_id) {
        this.person_id = person_id;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean getIs_confirmed() {
        return is_confirmed;
    }

    public void setIs_confirmed(boolean is_confirmed) {
        this.is_confirmed = is_confirmed;
    }

    public String getReg_date() {
        return reg_date;
    }

    public void setReg_date(String reg_date) {
        this.reg_date = reg_date;
    }

    public String getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(Date date) {
        this.birth_date = date;
    }
}
