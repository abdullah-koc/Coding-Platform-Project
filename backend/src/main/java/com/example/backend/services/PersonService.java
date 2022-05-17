package com.example.backend.services;

import com.example.backend.entities.Person;
import com.example.backend.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    @Autowired
    PersonRepository personRepository;

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
}
