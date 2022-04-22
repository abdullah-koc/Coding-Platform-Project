package com.example.backend.controllers;

import com.example.backend.entities.Attempt;
import com.example.backend.entities.User;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/user")
public class UserController {
    @Autowired
    UserService userService;

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
}
