package com.example.backend.services;

import com.example.backend.entities.Person;
import com.example.backend.repositories.PersonRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    @Autowired
    PersonRepository personRepository;

    /*public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }*/

    public PersonRepository getPersonRepository() {
        return this.personRepository;
    }

    public boolean login(String email, String password) {
        Person person = personRepository.findByEmail(email);
        if(person.getPassword().equals(password)) {
            return true;
        }
        return false;
    }
}
