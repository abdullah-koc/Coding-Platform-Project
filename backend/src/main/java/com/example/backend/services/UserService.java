package com.example.backend.services;

import com.example.backend.dto.UserDto;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;

    /*public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }*/

    public void signUp(UserDto userDto) {
        User user = new User();
        user.setFull_name(userDto.getFull_name());
        user.setEmail(userDto.getEmail());
        user.setBirth_date(userDto.getBirth_date());
        user.setNickname(userDto.getNickname());
        user.setPassword(userDto.getPassword());
        userRepository.save( user );
    }
}
