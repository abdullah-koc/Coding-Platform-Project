package com.example.backend.services;

import com.example.backend.dto.UserDto;
import com.example.backend.entities.Person;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    /*public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }*/

    public void signUp(UserDto userDto) {
        /*if(userRepository.findByEmail(userDto.getEmail()) != null) {
            throw new RuntimeException("User already exists");
        }*/

        User user = new User();
        user.setFull_name(userDto.getFull_name());
        user.setEmail(userDto.getEmail());
        user.setBirth_date(userDto.getBirth_date());
        user.setNickname(userDto.getNickname());
        user.setPassword(userDto.getPassword());
        //userRepository.save( user );
    }

    public boolean loginUser(String email, String password) {
        /*Person user = userRepository.findByEmail(email);
        if(user.getPassword() != password) {
            return false;
        }*/
        return true;
    }
}
