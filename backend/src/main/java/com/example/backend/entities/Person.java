package com.example.backend.entities;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "persons")
public class Person {

    @Id
    @Column(name="ID")
    private long ID;

    @Column(name="full_name")
    private String full_name;

    @Column(name="email")
    private String email;

    @Column(name="photo")
    private String photo;

    @Column(name="password")
    private String password;

    @Column(name="nickname")
    private String nickname;

    @Column(name="phone")
    private String phone;

    @Column(name="is_confirmed")
    private boolean is_confirmed;

    @Column(name="reg_date")
    private String reg_date;

    @Column(name="birth_date")
    private String birth_date;

    public Person() {

    }

    public Person(long ID,
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

    public void setID(Long ID) {
        this.ID = ID;
    }

    public Long getID() {
        return ID;
    }

    public void setID(long ID) {
        this.ID = ID;
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

    public boolean isIs_confirmed() {
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

    public void setBirth_date(String birth_date) {
        this.birth_date = birth_date;
    }
}
