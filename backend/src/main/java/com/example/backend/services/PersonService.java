package com.example.backend.services;

import com.example.backend.repositories.PersonRepository;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    PersonRepository personRepository;

    /*public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }*/
}
