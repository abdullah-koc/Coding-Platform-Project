package com.example.backend.services;

import com.example.backend.dto.UserDto;
import com.example.backend.entities.Attempt;
import com.example.backend.entities.Company;
import com.example.backend.entities.Person;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void signUp(UserDto userDto) {

        User user = new User();
        user.setFull_name(userDto.getFull_name());
        user.setEmail(userDto.getEmail());
        user.setBirth_date(userDto.getBirth_date());
        user.setNickname(userDto.getNickname());
        user.setPassword(userDto.getPassword());
        userRepository.signUp(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public boolean loginUser(String email, String password) {
        Person user = userRepository.findByEmail(email);
        if(user.getPassword() != password) {
            return false;
        }
        return true;
    }

    public void changeSchool(String user_id, String school){
        User user;
        userRepository.updateSchool(user_id, school);
    }

    public void changeDepartment(String user_id,String department){
        userRepository.updateDepartment(user_id, department);
    }

    public void changeCurrentCompany(String user_id, String cur_company){
       userRepository.updateCurrentCompany(user_id, cur_company);
    }

}
