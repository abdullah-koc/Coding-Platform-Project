package com.example.backend.services;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.UserStatsDto;
import com.example.backend.entities.Attempt;
import com.example.backend.entities.Company;
import com.example.backend.entities.Person;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    private void sendVerificationEmail(User user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "bingithelpdesk@gmail.com";
        String senderName = "Syncoder";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Syncoder.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFull_name());
        String verifyURL = siteURL + "/api/user/verify?code=" + user.getPerson_id();
        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public void signUp(UserDto userDto, String siteURL) throws MessagingException, UnsupportedEncodingException {

        User user = new User();
        user.setFull_name(userDto.getFull_name());
        user.setEmail(userDto.getEmail());
        user.setBirth_date(userDto.getBirth_date());
        user.setNickname(userDto.getNickname());
        user.setPassword(userDto.getPassword());
        userRepository.signUp(user);
        sendVerificationEmail(user, siteURL);
    }

    public boolean verifyUser(String verificationCode) {
        User user = userRepository.findById(verificationCode);

        if (user == null || user.getIs_confirmed()) {
            return false;
        } else {
            user.setIs_confirmed(true);
            userRepository.updateConfirmation(verificationCode);
            return true;
        }

    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.getAllUsers();
    }

    public boolean loginUser(String email, String password) {
        Person user = userRepository.findByEmail(email);
        if (user.getPassword().equals(password) && user.getIs_confirmed()) {
            return true;
        }
        return false;
    }

    public void changeSchool(String user_id, String school) {
        User user;
        userRepository.updateSchool(user_id, school);
    }

    public void changeDepartment(String user_id, String department) {
        userRepository.updateDepartment(user_id, department);
    }

    public void changeCurrentCompany(String user_id, String cur_company) {
        userRepository.updateCurrentCompany(user_id, cur_company);
    }

    public void changePhoto(String nickname, String photo) {
        User user = userRepository.findByNickname(nickname);
        user.setPhoto(photo);
        userRepository.updatePhoto(user.getPerson_id(), photo);
    }

    public List<UserStatsDto> getUserStats(String nickname) {
        return userRepository.getUserStats(nickname);
    }
}
