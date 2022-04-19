package com.example.backend.dto;

public class EditorDto extends PersonDto {
    private String cv_url;

    public String getCv_url() {
        return cv_url;
    }

    public void setCv_url(String cv_url) {
        this.cv_url = cv_url;
    }
}
