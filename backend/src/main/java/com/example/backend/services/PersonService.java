package com.example.backend.services;

import com.example.backend.entities.Person;
import com.example.backend.entities.User;
import com.example.backend.repositories.PersonRepository;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.passay.CharacterData;
import org.passay.CharacterRule;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

import static org.passay.DictionarySubstringRule.ERROR_CODE;

@Service
public class PersonService {
    @Autowired
    PersonRepository personRepository;

    @Autowired
    private JavaMailSender mailSender;

    public boolean login(String email, String password) {
        Person person = personRepository.findByEmail(email);

        if(password.equals(person.getPassword()) && person.getIs_confirmed()) {
            return true;
        }
        return false;
    }

    public void changePassword(String person_id, String password) {
        Person person = personRepository.findById(person_id);
        person.setPassword(password);
        personRepository.updatePassword(person_id, password);
    }

    public void changePhone(String person_id, String phone) {
        Person person = personRepository.findById(person_id);
        person.setPhone(phone);
        personRepository.updatePhone(person_id, phone);
    }

    public void changePhoto(String person_id, String photo) {
        Person person = personRepository.findById(person_id);
        person.setPhoto(photo);
        personRepository.updatePhoto(person_id, photo);
    }

    public Person getPersonByEmail(String email) {
        return personRepository.findPersonByEmail(email);
    }

    public Person getPersonByNickname(String nickname) { return personRepository.findPersonByNickname(nickname);}

    private void sendDefaultPassword(Person person, String password)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = person.getEmail();
        String fromAddress = "bingithelpdesk@gmail.com";
        String senderName = "Syncoder";
        String subject = "Get new password:";
        String content = "Dear [[name]],<br>"
                + "You can access your account with this password: [[password]]<br>"
                + "Thank you,<br>"
                + "Syncoder.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", person.getFull_name());
        content = content.replace("[[password]]", password);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public String generatePassayPassword() {
        PasswordGenerator gen = new PasswordGenerator();
        CharacterData lowerCaseChars = EnglishCharacterData.LowerCase;
        CharacterRule lowerCaseRule = new CharacterRule(lowerCaseChars);
        lowerCaseRule.setNumberOfCharacters(2);

        CharacterData upperCaseChars = EnglishCharacterData.UpperCase;
        CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
        upperCaseRule.setNumberOfCharacters(2);

        CharacterData digitChars = EnglishCharacterData.Digit;
        CharacterRule digitRule = new CharacterRule(digitChars);
        digitRule.setNumberOfCharacters(2);

        CharacterData specialChars = new CharacterData() {
            public String getErrorCode() {
                return ERROR_CODE;
            }

            public String getCharacters() {
                return "&";
            }
        };
        CharacterRule splCharRule = new CharacterRule(specialChars);
        splCharRule.setNumberOfCharacters(2);

        String password = gen.generatePassword(10, splCharRule, lowerCaseRule,
                upperCaseRule, digitRule);
        return password;
    }

    public void forgetPassword(String email) throws MessagingException, UnsupportedEncodingException{
        Person person = personRepository.findByEmail(email);
        String password = generatePassayPassword();
        System.out.println(password);
        sendDefaultPassword(person, password);
        personRepository.updatePassword(person.getPerson_id(), password);
    }
}
