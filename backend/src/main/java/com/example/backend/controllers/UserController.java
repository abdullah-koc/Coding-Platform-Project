package com.example.backend.controllers;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.UserStatsDto;
import com.example.backend.entities.Attempt;
import com.example.backend.entities.User;
import com.example.backend.services.PhotoService;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    private PhotoService photoService;

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        if (userService.verifyUser(code)) {
            return "verify success";
        } else {
            return "verify fail";
        }
    }

    @GetMapping("/all")
    public List<UserDto> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/change/school/{user_id}/{school}")
    public void changeSchool(@PathVariable String user_id, @PathVariable String school){
        userService.changeSchool(user_id, school);
    }
    @PostMapping("/change/department/{user_id}/{department}")
    public void changeDepartment(@PathVariable String user_id, @PathVariable String department){
        userService.changeDepartment(user_id, department);
    }
    @PostMapping("/change/current_company/{user_id}/{cur_company}")
    public void changeCurrentCompany(@PathVariable String user_id, @PathVariable String cur_company){
        userService.changeCurrentCompany(user_id, cur_company);
    }

    @PostMapping("/change/photo/{nickname}")
    public ResponseEntity<Map> changePhoto(@PathVariable String nickname, @RequestParam MultipartFile multipartFile) throws IOException {
        Map result = photoService.uploadPhoto(multipartFile);
        userService.changePhoto(nickname, (String) result.get("url"));
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/get/stats/{nickname}")
    public List<UserStatsDto> getUserStats(@PathVariable String nickname) {
        return userService.getUserStats(nickname);
    }
}
