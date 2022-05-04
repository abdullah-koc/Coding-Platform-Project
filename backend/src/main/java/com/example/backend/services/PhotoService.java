package com.example.backend.services;

import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class PhotoService {

    // properties
    private Cloudinary cloudinary;
    private Map<String, String> values;

    // constructor
    public PhotoService() {
        values = new HashMap<>();
        values.put("cloud_name", "syncoder");
        values.put("api_key", "161796272131753");
        values.put("api_secret", "Gayb9objsUeUNrndgabmuFIoViw");
        cloudinary = new Cloudinary(values);
    }

    // methods
    public Map uploadPhoto(MultipartFile multipartFile) throws IOException {
        File file = this.convert(multipartFile);
        Map result = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
        file.delete();
        return result;
    }

    private File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        FileOutputStream fileOutputStream = new FileOutputStream(file);
        fileOutputStream.write(multipartFile.getBytes());
        fileOutputStream.close();
        return file;
    }

}
